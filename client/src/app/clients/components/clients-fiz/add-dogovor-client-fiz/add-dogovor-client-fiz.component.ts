import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/account/store/selectors';
import { UserResponceRegister } from 'src/app/account/types/account.interfaces';
import { addClientFizDogovorAction, clientFizGetCurrent } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { getCurrentClientFizSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';



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




  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }


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


   let pdfData = new jsPDF('p', 'mm', 'a4');

   // Получение HTML-кода из элемента data
   let htmlContent = this.content.nativeElement;

   // Создание PDF из HTML-кода
   pdfData.html(htmlContent, {
     callback: function (pdf) {
       pdf.save(`Договор автопроката 'd-M-y')}.pdf`);
     }
   });

  //  let data = this.content.nativeElement;

   

  //  html2canvas(data as any, { scale: 2 }).then(canvas => {
  //    var imgWidth = 210;
  //    var imgHeight = canvas.height * imgWidth / canvas.width;
  //    const contentDataURL = canvas.toDataURL('image/png');
  //    let pdfData = new jsPDF('p', 'mm', 'a4');
  //    var position = 0;
  //    pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

  //    // Проверка, есть ли еще страницы и добавление их в PDF
  //    var totalPages = Math.ceil(canvas.height / pdfData.internal.pageSize.getHeight());
  //    for (var i = 1; i < totalPages; i++) {
  //      position = -(pdfData.internal.pageSize.getHeight() * i);
  //      pdfData.addPage();
  //      pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //    }

  //    pdfData.save(`Договор на ${this.currentClientFiz?.surname}-${this.currentClientFiz?.name}-${this.currentClientFiz?.lastname}-от-${this.datePipe.transform(this.xs_actual_date, 'd-M-y')}.pdf`);
  //  });
   

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
