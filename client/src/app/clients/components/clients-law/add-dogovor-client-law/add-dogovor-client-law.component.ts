import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('content') content!: ElementRef | any;




  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute) { }


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
    console.log(this.clientId);
  }


  initValues() {
    // Получаем лоадер
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    // Задаем значения даты действия договора.Для физ лиц 365 дней
    this.xs_actual_date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
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
  }

  // Генерируем PDF
 generatePDF() {
   var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

   if (this.currentClientLaw)
   {
     let docDefinition = {
       content: [html],
     };

     pdfMake.createPdf(docDefinition).download();
   }
    
  } 

  // Создаем договор
  createDogovor() {
    const dogovor = {
      date_start: this.xs_actual_date,
      dogovor_number: this.xs_actual_date + '/СТС-' + this.datePipe.transform(this.xs_actual_date, 'd-M-y') ,
      date_end: this.datePipe.transform(this.yearDate, 'yyyy-MM-dd'),
      client: this.currentClientLaw?._id,
      administrator: this.currentUser?._id,
      content: this.content.nativeElement.innerHTML,
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
