import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Smena } from '../../types/smena.interfaces';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { smenaCloseAction, smenaGetCurrent, smenaGetCurrentReset } from '../../store/actions/smena.action';
import { getCurrentSmenaSelector, isLoadingSelector } from '../../store/selectors';
import { Booking } from 'src/app/bookings/types/bookings.interfaces';
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


    // Очищаем состояние броней для смены
    this.store.dispatch(bookingsListForSmenaResetAction());
  }


  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.smenaId = params['id'];
      this.getBookingsList(this.smenaId)
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


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))
  }



  // Получение списка броней
  getBookingsList(smena_id: string) {
    this.store.dispatch(bookingsListForSmenaAction({ smena_id }));
  }



  closeSmena(event: any) {
    this.close_date = this.datePipe.transform(new Date(), 'dd.MM.yyyy HH:mm') || ''

    //Закрытие смены
    this.store.dispatch(smenaCloseAction({
      id: this.smenaId,
      close_date: this.close_date
    }));
  }
}
