import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { addClientFizDogovorAction, addClientFizDogovorActionFromBooking, clientFizGetCurrent } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { getCurrentClientFizSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';


// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { SettingGlobal } from 'src/app/settings/types/settings.interfaces';
import { noMoreSettingsGlobalListFalseAction, noMoreSettingsGlobalListTrueAction, settingsGlobalListAction, settingsGlobalListResetAction } from 'src/app/settings/store/actions/settings.action';
import { noMoreSettingsGlobalList, settingsGlobalListSelector } from 'src/app/settings/store/selectors';




@Component({
  selector: 'app-add-dogovor-client-fiz',
  templateUrl: './add-dogovor-client-fiz.component.html',
  styleUrls: ['./add-dogovor-client-fiz.component.css']
})
export class AddDogovorClientFizComponent {
  @Input() clientId: string = ''
  @Output() resultDogovor = new EventEmitter<boolean>();
  
  title: string = ''
  form!: FormGroup;
  isLoadingSelector$!: Observable<boolean | null>
  getParamsSub$!: Subscription
  currentClientFizSelector!: Observable<ClientFiz | null | undefined>
  currentClientFizSub$!: Subscription
  currentClientFiz!: ClientFiz | null | undefined
  clientFizId!: string
  datePipeString!: string;
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  yearDate: any;
  xs_actual_date: any;
  xs_actual_date_for_dogovor_number: any;
  xs_actual_time_hour: any;
  xs_actual_time_min: any;
  xs_actual_time_sec: any;



  settingsGlobalListSelector!: Observable<SettingGlobal[] | null | undefined>
  settingsGlobalListSub$!: Subscription
  settingsGlobalList: SettingGlobal[] | null | undefined = [];




  @ViewChild('content') content!: ElementRef | any;
  private renderer!: Renderer2;





  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute, private rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  ngOnInit(): void {
    this.getParams()
    this.initForm()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }
    if (this.currentClientFizSub$) {
      this.currentClientFizSub$.unsubscribe();
    }
    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }

    if (this.settingsGlobalListSub$) {
      this.settingsGlobalListSub$.unsubscribe();
    }

    // Отчищаем состояние settingsGlobalList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsGlobalListResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      if (this.clientId === '')
      {
        this.clientFizId = params['id'];
      }
      else
      {
        this.clientFizId = this.clientId;
      }
      
    });
    console.log(this.clientId);
    
  }

  initForm() {
    this.form = new FormGroup({
    });
  }

  initValues() {
    // Отчищаем состояние settingsGlobalList если не хотим сохранять список авто  в состояние
    this.store.dispatch(settingsGlobalListResetAction());

    // Получаем лоадер
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))


    // Отправляем запрос на получения списка настроек глобальных
    this.store.dispatch(settingsGlobalListAction({ params: {} }));

    // Задаем значения даты действия договора.Для физ лиц 365 дней
    this.xs_actual_date = this.datePipe.transform(Date.now(), 'dd.MM.yyyy');
    this.xs_actual_date_for_dogovor_number = this.xs_actual_date.replace(/\./g, '');
    
    
    // Преобразование строки в объект Date
    const parts = this.xs_actual_date.split('.');
    const date = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

    // Прибавление 365 дней
    this.yearDate = new Date(date);
    this.yearDate.setDate(this.yearDate.getDate() + 365);
    

    //Отправляем запрос на получение текущего физического лица
    this.store.dispatch(clientFizGetCurrent({ id: this.clientFizId }));

    this.currentClientFizSelector = this.store.pipe(select(getCurrentClientFizSelector))
    this.currentClientFizSub$ = this.currentClientFizSelector.subscribe({
      next: (currentClientFiz) => {
        this.currentClientFiz = currentClientFiz
        

        if (currentClientFiz) {
          this.title = `Создать договор для клиента ${currentClientFiz.surname} ${currentClientFiz.name}`
        }

      }
    })

    // Получаем текущего юзера
    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })



    // Получаем текущее время для id договора
    this.xs_actual_time_hour = new Date().getHours()
    this.xs_actual_time_min = ('0' + new Date().getMinutes()).slice(-2);
    this.xs_actual_time_sec = new Date().getSeconds()



     // Получаем селектор на получение списка settingsGlobalList и подписываемся на него.
    this.settingsGlobalListSelector = this.store.pipe(select(settingsGlobalListSelector))
    this.settingsGlobalListSub$ = this.settingsGlobalListSelector.subscribe({
      next: (settingsGlobalList) => {
        if (settingsGlobalList) {
          this.settingsGlobalList = settingsGlobalList;
          
        }
      }
    });
  }

  // Генерируем PDF
 generatePDF() {
  const styledHtml = `<div style="font-size: 12px;">${this.content.nativeElement.innerHTML}</div>`;
  const html = htmlToPdfmake(styledHtml);

   if (this.currentClientFiz)
   {
     let docDefinition = {
       content: [html],
     };

     pdfMake.createPdf(docDefinition).download('Договор для клиента' + this.currentClientFiz.surname + ' ' + this.currentClientFiz.name + ' ' + this.currentClientFiz.lastname + '.pdf');
   }
  } 



  // Отчищаем сохраняемый контент от служебных тегов Angular(ng-content и тд)
  cleanHtmlContent(): string {
    if (!this.content || !this.content.nativeElement) {
      return '';
    }
  
    const tempEl = this.renderer.createElement('div');
    this.renderer.appendChild(tempEl, this.content.nativeElement.cloneNode(true));
  
    const allElements = tempEl.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const attributes = element.attributes;
  
      for (let j = attributes.length - 1; j >= 0; j--) {
        const attrName = attributes[j].name;
        if (attrName.startsWith('ng-') || attrName.startsWith('_ng')) {
          element.removeAttribute(attrName);
        }
      }
    }
  
    return tempEl.innerHTML;
  }





  // Извлекаем из названия фирмы значение в ковычках
  getFirstQuotedString(input: string): string | null {
    const match = input.match(/[«"]([^«»"]+)[»"]/);
    return match ? match[1] : null;
  }


  // Извлекаем значение доверенности
  getTextAfterColon(input: string): string {
    const index = input.indexOf(':');
    return index !== -1 ? input.substring(index + 1) : '';
  }
  
  
  
  



  // Создаем договор
  createDogovor() {
    const cleanedContent = this.cleanHtmlContent();
    
    const dogovor = {
      date_start: this.xs_actual_date,
      dogovor_number: this.xs_actual_date_for_dogovor_number + '/' + this.xs_actual_time_hour + this.xs_actual_time_min,
      date_end: this.datePipe.transform(this.yearDate, 'yyyy.MM.dd'),
      client: this.currentClientFiz?._id,
      administrator: this.currentUser?._id,
      content: cleanedContent,
      state: 'active'
    }
    

    // Проверяем откуда мы создаем договор
    if (this.clientId === '')
    {
      this.store.dispatch(addClientFizDogovorAction({ dogovor: dogovor }));
    }
    else
    {
      this.store.dispatch(addClientFizDogovorActionFromBooking({ dogovor: dogovor }));
      this.resultDogovor.emit(true);
    }
  }

}
