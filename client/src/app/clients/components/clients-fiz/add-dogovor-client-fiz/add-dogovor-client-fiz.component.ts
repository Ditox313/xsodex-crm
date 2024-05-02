import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
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
  xs_actual_time_hour: any;
  xs_actual_time_min: any;
  xs_actual_time_sec: any;
  @ViewChild('content') content!: ElementRef | any;




  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute, private renderer: Renderer2) { }


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
    // Получаем лоадер
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    // Задаем значения даты действия договора.Для физ лиц 365 дней
    this.xs_actual_date = this.datePipe.transform(Date.now(), 'dd.MM.yyyy');
    this.yearDate = new Date(this.xs_actual_date);
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
    this.xs_actual_time_min = new Date().getMinutes()
    this.xs_actual_time_sec = new Date().getSeconds()
  }

  // Генерируем PDF
 generatePDF() {
  const styledHtml = `<div style="font-size: 8px;">${this.content.nativeElement.innerHTML}</div>`;
  const html = htmlToPdfmake(styledHtml);

   if (this.currentClientFiz)
   {
     let docDefinition = {
       content: [html],
     };

     pdfMake.createPdf(docDefinition).download('Договор для клиента ' + this.currentClientFiz.surname + '-' + this.currentClientFiz.name + '-' + this.currentClientFiz.lastname + '.pdf');
   }

   
    
  } 



  // Создаем договор
  createDogovor() {
    const dogovor = {
      date_start: this.xs_actual_date,
      dogovor_number: this.xs_actual_date + '/СТС-' + this.datePipe.transform(this.xs_actual_date, 'd-M-y') ,
      date_end: this.datePipe.transform(this.yearDate, 'yyyy-MM-dd'),
      client: this.currentClientFiz?._id,
      administrator: this.currentUser?._id,
      content: this.content.nativeElement.innerHTML,
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
