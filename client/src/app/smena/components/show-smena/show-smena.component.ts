import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Smena } from '../../types/smena.interfaces';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { paysListForSmenaAction, paysListForSmenaResetAction, smenaCloseAction, smenaGetCurrent, smenaGetCurrentReset } from '../../store/actions/smena.action';
import { getCurrentSmenaSelector, isLoadingSelector, paysListForSmenaSelector } from '../../store/selectors';
import { Booking, Pay } from 'src/app/bookings/types/bookings.interfaces';
import { bookingsListAction, bookingsListForSmenaAction, bookingsListForSmenaResetAction, bookingsListResetAction } from 'src/app/bookings/store/actions/bookings.action';
import { bookingsListForSmenaIdSelector, bookingsListSelector } from 'src/app/bookings/store/selectors';

@Component({
  selector: 'app-show-smena',
  templateUrl: './show-smena.component.html',
  styleUrls: ['./show-smena.component.css']
})
export class ShowSmenaComponent implements OnInit, OnDestroy {
  title: string = 'Просмотр смены №'
  getParamsSub$!: Subscription
  isLoadingSelector!: Observable<boolean | null>
  currentSmemaSelector!: Observable<Smena | null | undefined>
  currentSmemaSub$!: Subscription
  currentSmema!: Smena | null | undefined
  smenaId!: string
  close_date: string = ''


  bookingsListSelector!: Observable<Booking[] | null | undefined>;
  bookingsListSub$!: Subscription;
  bookingsList: Booking[] | null | undefined = [];



  paysListSelector!: Observable<Pay[] | null | undefined>;
  paysListForSmenaSub$!: Subscription;
  paysListForSmena: Pay[] | null | undefined = [];

  


  constructor( 
    private store: Store, 
    private rote: ActivatedRoute, 
    private datePipe: DatePipe,
    ) {}

  ngOnInit(): void {
  

    this.getParams()
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.getParamsSub$)
    {
      this.getParamsSub$.unsubscribe()
    } 
    if (this.currentSmemaSub$) {
      this.currentSmemaSub$.unsubscribe()
    } 

    if (this.bookingsListSub$) {
      this.bookingsListSub$.unsubscribe()
    } 

    if (this.paysListForSmenaSub$) {
      this.paysListForSmenaSub$.unsubscribe()
    } 


    // Очищаем состояние броней для смены
    this.store.dispatch(bookingsListForSmenaResetAction());


    // Очищаем состояние платежей для смены
    this.store.dispatch(paysListForSmenaResetAction());
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.smenaId = params['id'];
      this.getBookingsList(this.smenaId)
      this.getPaysList(this.smenaId)
    });
  }


  initValues()
  {
    // Отправляем запрос на получение текущей смены
    this.store.dispatch(smenaGetCurrent({ id: this.smenaId }));
    this.currentSmemaSelector = this.store.pipe(select(getCurrentSmenaSelector))
    this.currentSmemaSub$ = this.currentSmemaSelector.subscribe({
      next: (currentSmena) => {
        this.currentSmema = currentSmena
      }
    })




    // Подписываемся на список броней для смены
    this.bookingsListSelector = this.store.pipe(select(bookingsListForSmenaIdSelector));
    this.bookingsListSub$ = this.bookingsListSelector.subscribe({
      next: (bookingsList) => {
        if (bookingsList) {
          this.bookingsList = bookingsList;
        }
      }
    });



     // Подписываемся на список платежей для смены
     this.paysListSelector = this.store.pipe(select(paysListForSmenaSelector));
     this.paysListForSmenaSub$ = this.paysListSelector.subscribe({
       next: (payssList) => {
         if (payssList) {
           this.paysListForSmena = payssList;
           console.log('111', this.paysListForSmena);
           
         }
       }
     });


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))
  }



  // Получение списка броней
  getBookingsList(smena_id: string) {
    this.store.dispatch(bookingsListForSmenaAction({ smena_id }));
  }


  // Получение списка платежей для смены
  getPaysList(smenaId: string) {
    this.store.dispatch(paysListForSmenaAction({ smenaId }));
  }
  

  

  // Метод для получения номера брони по id
  getBookingOrderById(bookingId: string): any {
    // Ищем бронь по id
    if(this.bookingsList)
    {
      const booking = this.bookingsList.find((b) => b._id === bookingId);

      if(booking)
      {
        return booking.order
      }

      return
    }

  }




   // Метод для получения номера брони по id
   getBookingClientById(clientId: string): any {
    // Ищем бронь по id
    if(this.bookingsList)
    {
      const booking = this.bookingsList.find((b) => b.client._id === clientId);

      if(booking)
      {
        return booking.client.surname + ' ' + booking.client.name + ' ' + booking.client.lastname
      }

      return
    }

  }




  closeSmena(event: any) {
    this.close_date = this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm') || ''

    //Закрытие смены
    this.store.dispatch(smenaCloseAction({
      id: this.smenaId,
      close_date: this.close_date
    }));
  }




 


  // Подсчеты
// Вспомогательный метод для конвертации цены в число
private convertToNumber(price: string | Number): number {
  return typeof price === 'string' ? Number(price) : price.valueOf();
}

// Расчет суммы по типу оплаты (с учетом возвратов залогов)
calculateSumByType(type: string): number {
  if (!this.paysListForSmena) return 0;
  
  const regularPayments = this.paysListForSmena
    .filter(pay => pay.typeMoney === type && pay.type !== 'Залог')
    .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);

  // Находим залоги внесенные данным типом оплаты
  const depositsReceived = this.paysListForSmena
    .filter(pay => pay.typeMoney === type && pay.type === 'Залог' && this.convertToNumber(pay.pricePay) > 0)
    .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);

  // Находим возвраты залогов этим типом оплаты (независимо от того, как залог был внесен)
  const depositsReturned = this.paysListForSmena
    .filter(pay => pay.typeMoney === type && pay.type === 'Залог' && this.convertToNumber(pay.pricePay) < 0)
    .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);

  // Суммируем обычные платежи и операции с залогами
  return regularPayments + depositsReceived + depositsReturned;
}

// Подсчет общей суммы залогов (текущий баланс залогов)
calculateTotalDeposits(): number {
  if (!this.paysListForSmena) return 0;
  
  // Учитываем все операции с залогами (внесение и возврат)
  return this.paysListForSmena
    .filter(pay => pay.type === 'Залог')
    .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);
}

// Подсчет общего прихода (без учета залогов)
calculateTotalIncome(): number {
  if (!this.paysListForSmena) return 0;
  
  // Считаем только не залоговые операции
  return this.paysListForSmena
    .filter(pay => pay.type !== 'Залог')
    .reduce((sum, pay) => sum + this.convertToNumber(pay.pricePay), 0);
}
}

