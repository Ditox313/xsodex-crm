import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Booking } from 'src/app/bookings/types/bookings.interfaces';
import { bookingsListForClientLawAction, bookingsListForClientLawResetAction, clientLawGetCurrent } from 'src/app/clients/store/actions/actionsClientsLaw/clientsLaw.action';
import { bookingsListLawSelector, getCurrentClientLawSelector, isLoadingSelector } from 'src/app/clients/store/selectors/clientslaw/selectorsClientsLaw';
import { ClientFizDogovorsParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

@Component({
  selector: 'app-list-bookings-client-law',
  templateUrl: './list-bookings-client-law.component.html',
  styleUrls: ['./list-bookings-client-law.component.css']
})
export class ListBookingsClientLawComponent {
  STEP = 2;
  offset: number = 0;
  limit: number = this.STEP;
  title: string = 'Брони для клиента'
  isLoadingSelector!: Observable<boolean | null>
  bookingsListSelector!: Observable<Booking[] | null | undefined>
  bookingsListSub$!: Subscription
  bookingsList: Booking[] | null | undefined = [];
  clientLawId!: string
  getParamsSub$!: Subscription
  currentClientLawSelector!: Observable<ClientLaw | null | undefined>
  currentClientLawSub$!: Subscription
  currentClientLaw!: ClientLaw | null | undefined


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
    this.store.dispatch(bookingsListForClientLawResetAction());
  }

  getParams() {
    this.getParamsSub$ = this.rote.params.subscribe((params: any) => {
      this.clientLawId = params['id'];
    });
  }

  initValues() {
    // Отчищаем состояние 
    this.store.dispatch(bookingsListForClientLawResetAction());


    //Отправляем запрос на получение текущего юридичексого лица лица
    this.store.dispatch(clientLawGetCurrent({ id: this.clientLawId }));

    this.currentClientLawSelector = this.store.pipe(select(getCurrentClientLawSelector))
    this.currentClientLawSub$ = this.currentClientLawSelector.subscribe({
      next: (currentClientLaw) => {
        this.currentClientLaw = currentClientLaw

        if (currentClientLaw) {
          this.title = `Брогни  клиента - ${currentClientLaw.short_name} ${currentClientLaw.name}`
        }

      }
    })

    // Получаем селектор loader
    this.isLoadingSelector = this.store.pipe(select(isLoadingSelector))




    this.bookingsListSelector = this.store.pipe(select(bookingsListLawSelector))
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
      clientId: this.clientLawId,
    };


    // Отправляем запрос на получения списка броней
    this.store.dispatch(bookingsListForClientLawAction({ params: params }));
  }


  // Подгружаем брони
  loadmore() {
    this.offset += this.STEP;
    this.getBookingsList();
  }

}
