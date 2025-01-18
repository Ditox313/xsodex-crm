import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { BookingsService } from '../../services/bookings.service'
import { addActBookingAction, addActBookingFailureAction, addActBookingSuccessAction, addBookingAction, addBookingFailureAction, addBookingSuccessAction, bookingCreatePayAction, bookingCreatePayFailureAction, bookingCreatePaySuccessAction, bookingDeleteAction, bookingDeleteFailureAction, bookingDeleteSuccessAction, bookingGetCurrent, bookingGetCurrentFailureAction, bookingGetCurrentSuccessAction, bookingsListAction, bookingsListFailureAction, bookingsListForSmenaAction, bookingsListForSmenaFailureAction, bookingsListForSmenaSuccessAction, bookingsListSuccessAction, clientsForSearchListAction, clientsForSearchListFailureAction, clientsForSearchListSuccessAction, clientsSearchAction, clientsSearchFailureAction, clientsSearchSuccessAction, closeBookingAction, closeBookingFailureAction, closeBookingSuccessAction, currentActAction, currentActFailureAction, currentActSuccessAction, currentClientForActAction, currentClientForActFailureAction, currentClientForActSuccessAction, editBookingAction, editBookingFailureAction, editBookingSuccessAction, extendBookingAction, extendBookingFailureAction, extendBookingSuccessAction, noMoreBookingsListAction, noMoreClientsForSearchListAction, paysListAction, paysListFailureAction, paysListSuccessAction, toggleStatusBookingAction, toggleStatusFailureAction, toggleStatusSuccessAction, updateStateBookingsAction, updateStateBookingsFailureAction, updateStateBookingsSuccessAction } from '../actions/bookings.action'





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






    // Редактирования брони
  editBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBookingAction),
      switchMap(({ booking }) => {
        return this.bookings.edit(booking).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Бронь обновлена`, detail: 'Успешно!' });
            this.router.navigate(['/show-booking', data._id]);
            return editBookingSuccessAction({ booking: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              editBookingFailureAction({ errors: errorResponse.error.errors })
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




  
  // Получение всех броней по id смены
  bookingsListForSmenaId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsListForSmenaAction),
      concatMap((action) => {
        const smena_id = action.smena_id; // Извлекаем smena_id
        return this.bookings.bookingsListForSmenaId({smena_id}).pipe(
          concatMap((bookingsList) => {
            return of(bookingsListForSmenaSuccessAction({ data: bookingsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              bookingsListForSmenaFailureAction({ errors: errorResponse.error.errors })
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







  // Получение текущей брони
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






  // Проводим платеж
  bookingPay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingCreatePayAction),
      switchMap(({ pay_1, pay_2, pay_3, pay_4, pay_5 }) => {
        return this.bookings.create_pay(pay_1, pay_2, pay_3, pay_4, pay_5).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Платеж провевен`, detail: 'Успешно!' });
            return bookingCreatePaySuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              bookingCreatePayFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Получение всех броней
  paysList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paysListAction),
      concatMap(({id}) => {
        return this.bookings.getAllPays(id).pipe(
          concatMap((paysList) => {
            return of(paysListSuccessAction({ data: paysList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              paysListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Получение клиента для акта брони
  currentClientForAct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(currentClientForActAction),
      switchMap((id) => {
        return this.bookings.currentClientForAct(id.id).pipe(
          map((client) => {
            return currentClientForActSuccessAction({ data: client });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              currentClientForActFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );









  // Создание акт для брони
  addActBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addActBookingAction),
      switchMap(({act }) => {
        return this.bookings.addActBooking( act).pipe(
          map((act) => {
            this.messageService.add({ severity: 'success', summary: `Акт создан`, detail: 'Успешно!' });
            this.router.navigate(['/show-booking', act.bookingId]);
            return addActBookingSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addActBookingFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Изменяем статус брони когда авто поехало
  toogleStatusBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleStatusBookingAction),
      switchMap(({ bookingId }) => {
        return this.bookings.toggleStatusBooking(bookingId).pipe(
          map((booking) => {
            this.messageService.add({ severity: 'success', summary: `Статус брони изменен`, detail: 'Успешно!' });
            return toggleStatusSuccessAction({ booking: booking });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              toggleStatusFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );













  // Получение акта
  currentAct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(currentActAction),
      switchMap((id) => {
        return this.bookings.currentAct(id.id).pipe(
          map((act) => {
            return currentActSuccessAction({ act: act });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              currentActFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );







  // Продление брони
  extendBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(extendBookingAction),
      switchMap(({ data }) => {
        return this.bookings.extendBooking(data).pipe(
          map((booking) => {
            this.messageService.add({ severity: 'success', summary: `Бронь продлена`, detail: 'Успешно!' });
            this.router.navigate(['/show-booking', booking._id]);
            return extendBookingSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              extendBookingFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );








  // Закрытие брони
  closeBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(closeBookingAction),
      switchMap(({ data }) => {
        return this.bookings.closeBooking(data).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Бронь закрыта`, detail: 'Успешно!' });
            this.router.navigate(['/list-bookings']);
            return closeBookingSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              closeBookingFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );



  










}
