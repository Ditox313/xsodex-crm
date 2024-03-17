import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { ClientsFizService } from 'src/app/clients/services/clientsFiz/clientsFiz.service'
import { actsListForClientFizAction, actsListForClientFizFailureAction, actsListForClientFizSuccessAction, addClientFizAction, addClientFizDogovorAction, addClientFizDogovorActionFromBooking, addClientFizDogovorFailureAction, addClientFizDogovorSuccessAction, addClientFizFailureAction, addClientFizSuccessAction, bookingsListForClientFizAction, bookingsListForClientFizFailureAction, bookingsListForClientFizSuccessAction, clientFizDeleteAction, clientFizDeleteFailureAction, clientFizDeleteSuccessAction, clientFizDogovorDeleteAction, clientFizDogovorDeleteFailureAction, clientFizDogovorDeleteSuccessAction, clientFizDogovorGetCurrent, clientFizDogovorGetCurrentFailureAction, clientFizDogovorGetCurrentSuccessAction, clientFizDogovorsListAction, clientFizDogovorsListFailureAction, clientFizDogovorsListSuccessAction, clientFizGetCurrent, clientFizGetCurrentFailureAction, clientFizGetCurrentSuccessAction, clientsFizListAction, clientsFizListFailureAction, clientsFizListSuccessAction, clientsFizSearchAction, clientsFizSearchFailureAction, clientsFizSearchSuccessAction, noMoreActsListClientFizAction, noMoreClientFizDogovorsListAction, noMoreClientsFizListAction, updateClientFizAction, updateClientFizFailureAction, updateClientFizSuccessAction, updateStateClientsFizAction, updateStateClientsFizFailureAction, updateStateClientsFizSuccessAction } from '../../actions/actionsClientsFiz/clientsFiz.action'





@Injectable()
export class ClientsFizEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private clientsFiz: ClientsFizService,
  ) {}


  // Создание физического лица
  addClientFiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientFizAction), 
      switchMap(({ clientFiz, files }) => {
        return this.clientsFiz.create(clientFiz, files).pipe(
          map((clientFiz) => {
            this.messageService.add({ severity: 'success', summary: `Клиент создан`, detail: 'Успешно!' });
            this.router.navigate(['/list-clients-fiz']);
            return addClientFizSuccessAction({ clientFiz: clientFiz }); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientFizFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );








  // Получение всех физических лиц
  clientsFizList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsFizListAction),
      concatMap((params) => {
        return this.clientsFiz.getAllClientsFiz({ params }).pipe(
          concatMap((clientsFizList) => {
            if (clientsFizList.length === 0) {
              return of(noMoreClientsFizListAction({ data: true }));
            }
            return of(clientsFizListSuccessAction({ data: clientsFizList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientsFizListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление физичексого лица
  clientFizDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientFizDeleteAction),
      switchMap((id) => {
        return this.clientsFiz.delete(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Клиент удален`, detail: 'Успешно!' });
            return clientFizDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления клиента`, detail: 'Попробуйте позже!' });
            return of(
              clientFizDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление состояния
  updateStateClientsFiz$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateClientsFizAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateClientsFizSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateClientsFizFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение текущего физического лица
  getClientFizCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientFizGetCurrent),
      switchMap((id) => {
        return this.clientsFiz.getById(id.id).pipe(
          map((clientFiz) => {
            return clientFizGetCurrentSuccessAction({ data: clientFiz });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientFizGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление физического лица
  UpdateClientFiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateClientFizAction),
      switchMap(({ clientFiz, files }) => {
        return this.clientsFiz.update(clientFiz, files).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Клиент обновлен`, detail: 'Успешно!' });
            return updateClientFizSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateClientFizFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Создание договора
  addClientFizDogovor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientFizDogovorAction),
      switchMap(({ dogovor }) => {
        return this.clientsFiz.create_dogovor(dogovor).pipe(
          map((dogovor) => {
            this.messageService.add({ severity: 'success', summary: `Договор создан`, detail: 'Успешно!' });
            this.router.navigate([`/list-dogovors-clients-fiz/${dogovor.client}`]);
            return addClientFizDogovorSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientFizDogovorFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




  // Создание договора из брони
  addClientFizDogovorFromBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientFizDogovorActionFromBooking),
      switchMap(({ dogovor }) => {
        return this.clientsFiz.create_dogovor(dogovor).pipe(
          map((dogovor) => {
            // this.messageService.add({ severity: 'success', summary: `Договор создан`, detail: 'Успешно!' });
            // this.router.navigate([`/list-dogovors-clients-fiz/${dogovor.client}`]);
            return addClientFizDogovorSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientFizDogovorFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );









  // Получение всех договоров для физлица
  clientFizDogovorsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientFizDogovorsListAction),
      concatMap((params) => {
        return this.clientsFiz.get_all_dogovors({ params }).pipe(
          concatMap((clientsFizDogovorsList) => {
            if (clientsFizDogovorsList.length === 0) {
              return of(noMoreClientFizDogovorsListAction({ data: true }));
            }
            return of(clientFizDogovorsListSuccessAction({ data: clientsFizDogovorsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientFizDogovorsListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление договора
  clientFizDogovorDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientFizDogovorDeleteAction),
      switchMap((id) => {
        return this.clientsFiz.delete_dogovor(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Договор удален`, detail: 'Успешно!' });
            return clientFizDogovorDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления договора`, detail: 'Попробуйте позже!' });
            return of(
              clientFizDogovorDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение текущего договора
  getClientFizDogovorCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientFizDogovorGetCurrent),
      switchMap((id) => {
        return this.clientsFiz.getDogovorById(id.id).pipe(
          map((dogovor) => {
            return clientFizDogovorGetCurrentSuccessAction({ data: dogovor });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientFizDogovorGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Поиск
  clientsFizSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsFizSearchAction),
      concatMap((searchData) => {
        return this.clientsFiz.search({ searchData }).pipe(
          concatMap((clientsFizList) => {
            return of(clientsFizSearchSuccessAction({ data: clientsFizList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientsFizSearchFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение актов
  actsListForClientFiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actsListForClientFizAction),
      concatMap((params) => {
        return this.clientsFiz.actsListForClientFiz(params).pipe(
          concatMap((acts) => {
            if (acts.length === 0) {
              return of(noMoreActsListClientFizAction({ data: true }));
            }
            return of(actsListForClientFizSuccessAction({ data: acts }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              actsListForClientFizFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение броней
  bookingsListForClientFiz$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsListForClientFizAction),
      concatMap((params) => {
        return this.clientsFiz.bookingsListForClientFiz(params).pipe(
          concatMap((bookings) => {
            return of(bookingsListForClientFizSuccessAction({ data: bookings }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              bookingsListForClientFizFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





}
