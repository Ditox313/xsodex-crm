import { DatePipe } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { addClientFizDogovorAction, clientFizGetCurrent } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { getCurrentClientFizSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';


// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки и в tsconfig в compilerOptions 
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
      this.clientFizId = params['id'];
    });
  }

  initForm() {
    this.form = new FormGroup({
    });
  }

  initValues() {
    // Получаем лоадер
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    // Задаем значения даты действия договора.Для физ лиц 365 дней
    this.xs_actual_date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
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
  }

  // Генерируем PDF
 generatePDF() {
   var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

   if (this.currentClientFiz)
   {
     let docDefinition = {
       content: [html],
       filename: 'Договор для клиента' + this.currentClientFiz.surname + '-' + this.currentClientFiz.name + '-' + this.currentClientFiz.lastname + '.pdf'
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
      client: this.currentClientFiz?._id,
      administrator: this.currentUser?._id,
      content: this.content.nativeElement.innerHTML,
      state: 'active'
    }

    this.store.dispatch(addClientFizDogovorAction({ dogovor: dogovor }));
  }
}
