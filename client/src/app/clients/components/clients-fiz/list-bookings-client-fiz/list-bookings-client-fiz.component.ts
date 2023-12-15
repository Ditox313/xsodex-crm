import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Booking, BookingsParamsFetch } from 'src/app/bookings/types/bookings.interfaces';
import { bookingsListForClientFizAction, bookingsListForClientFizResetAction, clientFizGetCurrent } from 'src/app/clients/store/actions/actionsClientsFiz/clientsFiz.action';
import { bookingsListFizSelector, getCurrentClientFizSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientsFiz/selectorsClientsFiz';
import { ClientFiz, ClientFizDogovorsParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';

@Component({
  selector: 'app-list-bookings-client-fiz',
  templateUrl: './list-bookings-client-fiz.component.html',
  styleUrls: ['./list-bookings-client-fiz.component.css']
})
export class ListBookingsClientFizComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Брони для клиента'
  isLoadingSelector!: Observable<boolean | null>
  bookingsListSelector!: Observable<Booking[] | null | undefined>
  bookingsListSub$!: Subscription
  bookingsList: Booking[] | null | undefined = [];
  clientFizId!: string
  getParamsSub$!: Subscription
  currentClientFizSelector!: Observable<ClientFiz | null | undefined>
  currentClientFizSub$!: Subscription
  currentClientFiz!: ClientFiz | null | undefined


  constructor(private store: Store, private rote: ActivatedRoute,) { }
  ngOnInit(): void {
    this.getParams()
    this.initValues();
    this.getBookingsList();
  }

  ngOnDestroy(): void {
    if (this.bookingsListSub$) {
      this.bookingsListSub$.unsubscribe();
    }


    if (this.getParamsSub$) {
      this.getParamsSub$.unsubscribe();
    }

    // Отчищаем состояние 
    this.store.dispatch(bookingsListForClientFizResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientFizId = params['id'];
    });
  }

  initValues() {
    // Отчищаем состояние 
    this.store.dispatch(bookingsListForClientFizResetAction());


    //Отправляем запрос на получение текущего физического лица
    this.store.dispatch(clientFizGetCurrent({ id: this.clientFizId }));

    this.currentClientFizSelector = this.store.pipe(select(getCurrentClientFizSelector))
    this.currentClientFizSub$ = this.currentClientFizSelector.subscribe({
      next: (currentClientFiz) => {
        this.currentClientFiz = currentClientFiz

        if (currentClientFiz) {
          this.title = `Брони клиента - ${currentClientFiz.surname} ${currentClientFiz.name} ${currentClientFiz.lastname}`
        }

      }
    })

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))






    this.bookingsListSelector = this.store.pipe(select(bookingsListFizSelector))
    this.bookingsListSub$ = this.bookingsListSelector.subscribe({
      next: (bookingsList) => {
        if (bookingsList) {
          this.bookingsList = bookingsList;
        }
      }
    });
  }


  getBookingsList() {

    const params: ClientFizDogovorsParamsFetch = {
      offset: this.offset,
      limit: this.limit,
      clientId: this.clientFizId,
    };


    // Отправляем запрос на получения списка броней
    this.store.dispatch(bookingsListForClientFizAction({ params: params }));
  }


  // Подгружаем брони
  loadmore() {
    this.offset += this.STEP;
    this.getBookingsList();
  }


}
