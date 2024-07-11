import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { getCurrentClientLawSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { addClientLawDogovorAction, addClientLawDogovorActionFromBooking, clientLawGetCurrent } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';

@Component({
  selector: 'app-add-dogovor-client-law',
  templateUrl: './add-dogovor-client-law.component.html',
  styleUrls: ['./add-dogovor-client-law.component.css']
})
export class AddDogovorClientLawComponent {
  @Input() clientId: string = ''
  @Output() resultDogovor = new EventEmitter<boolean>();
  title: string = ''
  isLoadingSelector$!: Observable<boolean | null>
  getParamsSub$!: Subscription
  currentClientLawSelector!: Observable<ClientLaw | null | undefined>
  currentClientLawSub$!: Subscription
  currentClientLaw!: ClientLaw | null | undefined
  clientLawId!: string
  datePipeString!: string;
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  yearDate: any;
  xs_actual_date: any;
  xs_actual_time_hour: any;
  xs_actual_time_min: any;
  xs_actual_time_sec: any;
  @ViewChild('content') content!: ElementRef | any;
  private renderer!: Renderer2;




  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,  private rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  ngOnInit(): void {
    this.getParams()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }
    if (this.currentClientLawSub$) {
      this.currentClientLawSub$.unsubscribe();
    }
    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      if (this.clientId === '') {
        this.clientLawId = params['id'];
      }
      else {
        this.clientLawId = this.clientId;
      }

    });
  }


  initValues() {
    // Получаем лоадер
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    // Задаем значения даты действия договора.Для физ лиц 365 дней
    this.xs_actual_date = this.datePipe.transform(Date.now(), 'dd.MM.yyyy');
    this.yearDate = new Date(this.xs_actual_date);
    this.yearDate.setDate(this.yearDate.getDate() + (365 * 3));

    //Отправляем запрос на получение текущего юридического лица
    this.store.dispatch(clientLawGetCurrent({ id: this.clientLawId }));

    this.currentClientLawSelector = this.store.pipe(select(getCurrentClientLawSelector))
    this.currentClientLawSub$ = this.currentClientLawSelector.subscribe({
      next: (currentClientLaw) => {
        this.currentClientLaw = currentClientLaw

        if (currentClientLaw) {
          this.title = `Создать договор для клиента ${currentClientLaw.short_name} ${currentClientLaw.name}`
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
    this.xs_actual_time_min = new Date().getMinutes()
    this.xs_actual_time_sec = new Date().getSeconds()
  }

  // Генерируем PDF
 generatePDF() {
  const styledHtml = `<div style="font-size: 12px;">${this.content.nativeElement.innerHTML}</div>`;
  const html = htmlToPdfmake(styledHtml);

   if (this.currentClientLaw)
   {
     let docDefinition = {
       content: [html],
     };

     pdfMake.createPdf(docDefinition).download('Договор для клиента ' + this.currentClientLaw.short_name + ' ' + this.currentClientLaw.name + '.pdf');
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

  // Создаем договор
  createDogovor() {
    const cleanedContent = this.cleanHtmlContent();

    const dogovor = {
      date_start: this.xs_actual_date,
      dogovor_number: this.xs_actual_date + '/СТС-' + this.datePipe.transform(this.xs_actual_date, 'd-M-y') ,
      date_end: this.datePipe.transform(this.yearDate, 'yyyy-MM-dd'),
      client: this.currentClientLaw?._id,
      administrator: this.currentUser?._id,
      content: cleanedContent,
      state: 'active'
    }

    // Проверяем откуда мы создаем договор
    if (this.clientId === '') {
      this.store.dispatch(addClientLawDogovorAction({ dogovor: dogovor }));
    }
    else {
      this.store.dispatch(addClientLawDogovorActionFromBooking({ dogovor: dogovor }));
      this.resultDogovor.emit(true);
    }
  }
}
