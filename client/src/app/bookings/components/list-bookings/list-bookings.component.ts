import { Component, OnDestroy, OnInit } from '@angular/core';
import { Booking, BookingsParamsFetch } from '../../types/bookings.interfaces';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { bookingsListSelector, isLoadingSelector, noMoreBookingsList } from '../../store/selectors';
import { bookingDeleteAction, bookingsListAction, bookingsListResetAction, noMoreBookingsListFalseAction, noMoreBookingsListTrueAction } from '../../store/actions/bookings.action';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit, OnDestroy {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Брони'
  isLoadingSelector!: Observable<boolean | null>
  noMoreBookingsList!: Observable<boolean | null>
  bookingsListSelector!: Observable<Booking[] | null | undefined>
  bookingsListSub$!: Subscription
  bookingsList: Booking[] | null | undefined = [];


  constructor(private store: Store) { }
  ngOnInit(): void {
    this.initValues();
    this.getBookingsList();
  }

  ngOnDestroy(): void {
    if (this.bookingsListSub$) {
      this.bookingsListSub$.unsubscribe();
    }

    // Отчищаем состояние 
    this.store.dispatch(bookingsListResetAction());
  }

  initValues() {
    // Отчищаем состояние 
    this.store.dispatch(bookingsListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMorePartnersList
    this.noMoreBookingsList = this.store.pipe(select(noMoreBookingsList))




    // Получаем селектор на получение списка партнеров и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    this.bookingsListSelector = this.store.pipe(select(bookingsListSelector))
    this.bookingsListSub$ = this.bookingsListSelector.subscribe({
      next: (bookingsList) => {
        if (bookingsList) {
          this.bookingsList = bookingsList;


          if (this.bookingsList.length >= this.STEP) {
            // Изменяем значение noMoreBookingsList в состоянии на false что бы открыть кнопку загрузить ещё
            this.store.dispatch(noMoreBookingsListFalseAction());
          }
          else {
            // Изменяем значение noMoreBookingsList в состоянии на true что бы скрыть кнопку загрузить ещё
            this.store.dispatch(noMoreBookingsListTrueAction());
          }
        }
      }
    });
  }


  getBookingsList() {
    const params: BookingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка броней
    this.store.dispatch(bookingsListAction({ params: params }));
  }


  // Подгружаем брони
  loadmore() {
    this.offset += this.STEP;
    this.getBookingsList();
  }


  // Удаление партнера
  onDeleteBooking(event: Event, booking: Booking) {
    event.stopPropagation();
    const dicision = window.confirm(`Удалить Бронь?`);

    if (dicision) {
      this.store.dispatch(bookingDeleteAction({ id: booking._id }))
    }
  }
}
