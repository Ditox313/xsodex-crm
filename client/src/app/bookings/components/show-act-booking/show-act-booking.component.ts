import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Act, Booking } from '../../types/bookings.interfaces';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

// Для корректной работы необходимо установить отдельный пакет типов для каждой библиотеки(см ошибку) и в tsconfig в compilerOptions 
// добавить "allowSyntheticDefaultImports": true,
import * as pdfMake from "pdfmake/build/pdfmake";
import * as  pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from "html-to-pdfmake"
import { getCurrentActSelector, getCurrentBookingSelector, isLoadingSelector } from '../../store/selectors';
import { bookingGetCurrent, bookingGetCurrentReset, currentActAction, currentActResetAction } from '../../store/actions/bookings.action';


@Component({
  selector: 'app-show-act-booking',
  templateUrl: './show-act-booking.component.html',
  styleUrls: ['./show-act-booking.component.css']
})
export class ShowActBookingComponent {
  isLoadingSelector$!: Observable<boolean | null>
  currentActSelector!: Observable<Act | null | undefined>
  currentActSub$!: Subscription
  currentAct!: Act | null | undefined

  currentBookingSelector!: Observable<Booking | null | undefined>
  currentBookingSub$!: Subscription
  currentBooking!: Booking & { client: any } & { car: any } & { tarif: any } & { additional_services: any } | null | undefined;

  
  getParamsSub$!: Subscription
  title: string = ''
  bookingId: string = '';
  @ViewChild('content') content!: ElementRef | any;


  constructor(public datePipe: DatePipe, private store: Store, private rote: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getParams()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe()
    }
    if (this.currentActSub$) {
      this.currentActSub$.unsubscribe()
    }

    if (this.currentBookingSub$) {
      this.currentBookingSub$.unsubscribe()
    }

    //Отчищаем состояние currentClientFiz
    this.store.dispatch(currentActResetAction());
    this.store.dispatch(bookingGetCurrentReset());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.bookingId = params['id'];
    });
  }


  initValues() {

    //Отчищаем состояние currentClientFiz
    this.store.dispatch(currentActResetAction());
    this.store.dispatch(bookingGetCurrentReset());


    // Получаем селектор loader
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
    

    //Отправляем запрос на получение текущей брони
    this.store.dispatch(bookingGetCurrent({ id: this.bookingId }));
    this.currentBookingSelector = this.store.pipe(select(getCurrentBookingSelector))
    this.currentBookingSub$ = this.currentBookingSelector.subscribe({
      next: (currentBooking) => {
        
        if (currentBooking) {
          this.currentBooking = currentBooking
          this.title = `Просмотр акта для брони №${currentBooking.order}`

          //Отправляем запрос на получение текущего акта
          this.store.dispatch(currentActAction({ id: this.currentBooking.act }));
        }
      }
    })

    

    this.currentActSelector = this.store.pipe(select(getCurrentActSelector))
    this.currentActSub$ = this.currentActSelector.subscribe({
      next: (act) => {
        
        
        this.currentAct = act
        
      }
    })

  }




  // Генерируем PDF
  generatePDF() {
    // var html = htmlToPdfmake(this.content.nativeElement.innerHTML);

    const styledHtml = `<div style="font-size: 6px;">${this.currentAct ? this.currentAct.content : ''}</div>`;
    const html = htmlToPdfmake(styledHtml);

    if(this.currentAct)
    {
      let docDefinition = {
        content: [html],
      };
  
      pdfMake.createPdf(docDefinition).download('Акт  для брони №' + this.currentBooking?.order + '.pdf');
    }

    

  }

}
