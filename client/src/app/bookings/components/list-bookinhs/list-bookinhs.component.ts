import { Component, OnDestroy, OnInit } from '@angular/core';
import { Booking, BookingsParamsFetch } from '../../types/bookings.interfaces';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-list-bookinhs',
  templateUrl: './list-bookinhs.component.html',
  styleUrls: ['./list-bookinhs.component.css']
})
export class ListBookinhsComponent implements OnInit, OnDestroy {
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

    // Отчищаем состояние partnersList если не хотим сохранять список авто  в состояние
    // this.store.dispatch(partnersListResetAction());
  }

  initValues() {
    // Отчищаем состояние перед запросом на получение списка авто
    // this.store.dispatch(partnersListResetAction());


    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))


    // Получаем селектор noMorePartnersList
    // this.noMorePartnersList = this.store.pipe(select(noMorePartnersList))




    // Получаем селектор на получение списка партнеров и подписываемся на него. То есть мы наблюдаем за состоянием и отрисовываем список смен.
    // как только мы подгрузим еще, состояние изменится и соответственно изменится наш список смен
    // this.partnersListSelector = this.store.pipe(select(partnersListSelector))
    // this.partnersListSub$ = this.partnersListSelector.subscribe({
    //   next: (partnersList) => {
    //     if (partnersList) {
    //       this.partnersList = partnersList;


    //       if (this.partnersList.length >= this.STEP) {
    //         // Изменяем значение noMorePartnersList в состоянии на false что бы открыть кнопку загрузить ещё
    //         this.store.dispatch(noMorePartnersListFalseAction());
    //       }
    //       else {
    //         // Изменяем значение noMorePartnersList в состоянии на true что бы скрыть кнопку загрузить ещё
    //         this.store.dispatch(noMorePartnersListTrueAction());
    //       }
    //     }
    //   }
    // });
  }


  getBookingsList() {
    const params: BookingsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
    };

    // Отправляем запрос на получения списка партнеров
    // this.store.dispatch(partnersListAction({ params: params }));
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

    // if (dicision) {
    //   this.store.dispatch(partnerDeleteAction({ id: partner._id }))
    // }
  }
}
