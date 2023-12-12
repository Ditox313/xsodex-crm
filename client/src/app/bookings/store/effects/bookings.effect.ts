import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { BookingsService } from '../../services/bookings.service'
import { addBookingAction, addBookingFailureAction, addBookingSuccessAction, bookingDeleteAction, bookingDeleteFailureAction, bookingDeleteSuccessAction, bookingGetCurrent, bookingGetCurrentFailureAction, bookingGetCurrentSuccessAction, bookingsListAction, bookingsListFailureAction, bookingsListSuccessAction, clientsForSearchListAction, clientsForSearchListFailureAction, clientsForSearchListSuccessAction, clientsSearchAction, clientsSearchFailureAction, clientsSearchSuccessAction, noMoreBookingsListAction, noMoreClientsForSearchListAction, updateStateBookingsAction, updateStateBookingsFailureAction, updateStateBookingsSuccessAction } from '../actions/bookings.action'





@Injectable()
export class BookingsEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private bookings: BookingsService,
  ) {}


  // Создание брони
  addBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBookingAction), 
      switchMap(({ booking }) => {
        return this.bookings.create(booking).pipe(
          map((booking) => {
            this.messageService.add({ severity: 'success', summary: `Бронь создана`, detail: 'Успешно!' });
            this.router.navigate(['/list-bookings']);
            return addBookingSuccessAction(); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addBookingFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех броней
  bookingsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsListAction),
      concatMap((params) => {
        return this.bookings.getAllBookings({ params }).pipe(
          concatMap((bookingsList) => {
            if (bookingsList.length === 0) {
              return of(noMoreBookingsListAction({ data: true }));
            }
            return of(bookingsListSuccessAction({ data: bookingsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              bookingsListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление брони
  bookingDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingDeleteAction),
      switchMap((id) => {
        return this.bookings.delete(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Партнер удален`, detail: 'Успешно!' });
            return bookingDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления партнера`, detail: 'Попробуйте позже!' });
            return of(
              bookingDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );







  // Получение всех клиентов для поиска
  clientsForSearchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsForSearchListAction),
      concatMap((params) => {
        return this.bookings.getAllClientsForSearch({ params }).pipe(
          concatMap((clientsList) => {
            if (clientsList.length === 0) {
              return of(noMoreClientsForSearchListAction({ data: true }));
            }
            return of(clientsForSearchListSuccessAction({ data: clientsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientsForSearchListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Поиск
  clientsSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsSearchAction),
      concatMap((searchData) => {
        return this.bookings.search({ searchData }).pipe(
          concatMap((clientsList) => {
            return of(clientsSearchSuccessAction({ data: clientsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientsSearchFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление состояния
  updateStateBookings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateBookingsAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateBookingsSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateBookingsFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение ттекущей брони
  getCurrentBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingGetCurrent),
      switchMap((id) => {
        return this.bookings.getById(id.id).pipe(
          map((booking) => {
            return bookingGetCurrentSuccessAction({ data: booking });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              bookingGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление партнера
  // UpdatePartner$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updatePartnerAction),
  //     switchMap(({ partner, file_1, file_2 }) => {
  //       return this.partners.update(partner, file_1, file_2).pipe(
  //         map((data) => {
  //           this.messageService.add({ severity: 'success', summary: `Партнер обновлен`, detail: 'Успешно!' });
  //           return updatePartnerSuccessAction({ data: data });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
  //           return of(
  //             updatePartnerFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );





  // Получение всех партнеров без параметров
  // partnersNoParamsList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(partnersListNoParamsAction),
  //     concatMap((params) => {
  //       return this.partners.getAllPartnersNoParams().pipe(
  //         concatMap((partnersList) => {
  //           return of(partnersListNoParamsSuccessAction({ data: partnersList }));
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             partnersListNoParamsFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );




}
