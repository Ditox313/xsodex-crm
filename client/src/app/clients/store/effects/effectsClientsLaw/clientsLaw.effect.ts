import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { ClientsLawService } from 'src/app/clients/services/clientsLaw/clientsLaw.service'
import { actsListForClientLawAction, actsListForClientLawFailureAction, actsListForClientLawSuccessAction, addClientLawAction, addClientLawDogovorAction, addClientLawDogovorActionFromBooking, addClientLawDogovorFailureAction, addClientLawDogovorSuccessAction, addClientLawFailureAction, addClientLawSuccessAction, addTrustedPersoneAction, addTrustedPersoneFailureAction, addTrustedPersoneSuccessAction, bookingsListForClientLawAction, bookingsListForClientLawFailureAction, bookingsListForClientLawSuccessAction, clientLawDeleteAction, clientLawDeleteFailureAction, clientLawDeleteSuccessAction, clientLawDogovorDeleteAction, clientLawDogovorDeleteFailureAction, clientLawDogovorDeleteSuccessAction, clientLawDogovorGetCurrent, clientLawDogovorGetCurrentFailureAction, clientLawDogovorGetCurrentSuccessAction, clientLawDogovorsListAction, clientLawDogovorsListFailureAction, clientLawDogovorsListSuccessAction, clientLawGetCurrent, clientLawGetCurrentFailureAction, clientLawGetCurrentSuccessAction, clientsLawListAction, clientsLawListFailureAction, clientsLawListSuccessAction, clientsLawSearchAction, clientsLawSearchFailureAction, clientsLawSearchSuccessAction, noMoreActsListClientLawAction, noMoreClientLawDogovorsListAction, noMoreClientsLawListAction, noMoreTrustedPersoneListAction, trustedPersoneDeleteAction, trustedPersoneDeleteFailureAction, trustedPersoneDeleteSuccessAction, trustedPersoneGetCurrent, trustedPersoneGetCurrentFailureAction, trustedPersoneGetCurrentSuccessAction, trustedPersoneListAction, trustedPersoneListFailureAction, trustedPersoneListSuccessAction, trustedPersoneSearchAction, trustedPersoneSearchFailureAction, trustedPersoneSearchSuccessAction, updateClientLawAction, updateClientLawFailureAction, updateClientLawSuccessAction, updateStateClientsLawAction, updateStateClientsLawFailureAction, updateStateClientsLawSuccessAction, updateTrustedPersoneAction, updateTrustedPersoneFailureAction, updateTrustedPersoneSuccessAction } from '../../actions/actionsClientsLaw/clientsLaw.action'





@Injectable()
export class ClientsLawEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private clientsLaw: ClientsLawService,
  ) {}


  // Создание юридического лица
  addClientLaw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientLawAction), 
      switchMap(({ clientLaw, files, from}) => {
        return this.clientsLaw.create(clientLaw, files).pipe(
          map((clientLaw) => {
            this.messageService.add({ severity: 'success', summary: `Клиент создан`, detail: 'Успешно!' });
            
            // Если создаем клиента не из брони
            if(from !== 'add_booking')
            {
              this.router.navigate(['/list-clients-law']);
            }

            return addClientLawSuccessAction({ clientLaw: clientLaw,  from: from }); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientLawFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех юридичексих лиц
  clientsLawList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsLawListAction),
      concatMap((params) => {
        return this.clientsLaw.getAllClientsLaw({ params }).pipe(
          concatMap((clientsLawList) => {
            if (clientsLawList.length === 0) {
              return of(noMoreClientsLawListAction({ data: true }));
            }
            return of(clientsLawListSuccessAction({ data: clientsLawList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientsLawListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление юридического лица
  clientLawDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientLawDeleteAction),
      switchMap((id) => {
        return this.clientsLaw.delete(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Клиент удален`, detail: 'Успешно!' });
            return clientLawDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления клиента`, detail: 'Попробуйте позже!' });
            return of(
              clientLawDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление состояния
  updateStateClientsLaw$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateClientsLawAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateClientsLawSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateClientsLawFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение текущего юридического лица
  getClientLawCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientLawGetCurrent),
      switchMap((id) => {
        return this.clientsLaw.getById(id.id).pipe(
          map((clientLaw) => {
            return clientLawGetCurrentSuccessAction({ data: clientLaw });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientLawGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление Юридического лица
  UpdateClientLaw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateClientLawAction),
      switchMap(({ clientLaw, files }) => {
        return this.clientsLaw.update(clientLaw, files).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Клиент обновлен`, detail: 'Успешно!' });
            return updateClientLawSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateClientLawFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Создание договора
  addClientLawDogovor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientLawDogovorAction),
      switchMap(({ dogovor }) => {
        return this.clientsLaw.create_dogovor(dogovor).pipe(
          map((dogovor) => {
            this.messageService.add({ severity: 'success', summary: `Договор создан`, detail: 'Успешно!' });
            this.router.navigate([`/list-dogovors-clients-law/${dogovor.client}`]);
            return addClientLawDogovorSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientLawDogovorFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Создание договора из брони
  addClientFizDogovorFromBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientLawDogovorActionFromBooking),
      switchMap(({ dogovor }) => {
        return this.clientsLaw.create_dogovor(dogovor).pipe(
          map((dogovor) => {
            // this.messageService.add({ severity: 'success', summary: `Договор создан`, detail: 'Успешно!' });
            // this.router.navigate([`/list-dogovors-clients-fiz/${dogovor.client}`]);
            return addClientLawDogovorSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addClientLawDogovorFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );









  // Получение всех договоров для физлица
  clientLawDogovorsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientLawDogovorsListAction),
      concatMap((params) => {
        return this.clientsLaw.get_all_dogovors({ params }).pipe(
          concatMap((clientsLawDogovorsList) => {
            if (clientsLawDogovorsList.length === 0) {
              return of(noMoreClientLawDogovorsListAction({ data: true }));
            }
            return of(clientLawDogovorsListSuccessAction({ data: clientsLawDogovorsList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientLawDogovorsListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление договора
  clientLawDogovorDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientLawDogovorDeleteAction),
      switchMap((id) => {
        return this.clientsLaw.delete_dogovor(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Договор удален`, detail: 'Успешно!' });
            return clientLawDogovorDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления договора`, detail: 'Попробуйте позже!' });
            return of(
              clientLawDogovorDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение текущего договора
  getClientLawDogovorCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientLawDogovorGetCurrent),
      switchMap((id) => {
        return this.clientsLaw.getDogovorById(id.id).pipe(
          map((dogovor) => {
            return clientLawDogovorGetCurrentSuccessAction({ data: dogovor });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientLawDogovorGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Поиск
  clientsLawSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientsLawSearchAction),
      concatMap((searchData) => {
        return this.clientsLaw.search({ searchData }).pipe(
          concatMap((clientsLawList) => {
            return of(clientsLawSearchSuccessAction({ data: clientsLawList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              clientsLawSearchFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );








  // Получение актов
  actsListForClientLaw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actsListForClientLawAction),
      concatMap((params) => {
        return this.clientsLaw.actsListForClientLaw(params).pipe(
          concatMap((acts) => {
            if (acts.length === 0) {
              return of(noMoreActsListClientLawAction({ data: true }));
            }
            return of(actsListForClientLawSuccessAction({ data: acts }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              actsListForClientLawFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );











  // Получение броней
  bookingsListForClientLaw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsListForClientLawAction),
      concatMap((params) => {
        return this.clientsLaw.bookingsListForClientLaw(params).pipe(
          concatMap((bookings) => {
            return of(bookingsListForClientLawSuccessAction({ data: bookings }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              bookingsListForClientLawFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





    // Создание доверенного лица для ораганизации
  addTrustedPersone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTrustedPersoneAction), 
      switchMap(({ trustedPersone, files}) => {
        return this.clientsLaw.createTrustedPersone(trustedPersone, files).pipe(
          map((trustedPersone) => {
            this.messageService.add({ severity: 'success', summary: `Доверенное лицо создано`, detail: 'Успешно!' });
            

            this.router.navigate(['/list-trusted-persones', trustedPersone.organizationId]);

            return addTrustedPersoneSuccessAction({ trustedPersone: trustedPersone }); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addTrustedPersoneFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Получение всех доверенных лиц лиц
  trustedPersoneList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trustedPersoneListAction),
      concatMap((params) => {
        return this.clientsLaw.getAllTrustedPersone({ params }).pipe(
          concatMap((trustedPersoneList) => {
            if (trustedPersoneList.length === 0) {
              return of(noMoreTrustedPersoneListAction({ data: true }));
            }
            return of(trustedPersoneListSuccessAction({ data: trustedPersoneList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              trustedPersoneListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );



    // Удаление доверенного лица
  trustedPersoneDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trustedPersoneDeleteAction),
      switchMap((id) => {
        return this.clientsLaw.deleteTrustedPersone(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Доверенное лицо удалено`, detail: 'Успешно!' });
            return trustedPersoneDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления доверенного лица`, detail: 'Попробуйте позже!' });
            return of(
              trustedPersoneDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Поиск по доверенным лицам
  trustedPersoneSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trustedPersoneSearchAction),
      concatMap((searchData) => {
        return this.clientsLaw.searchTrustedPersone({ searchData }).pipe(
          concatMap((trustedPersones) => {
            return of(trustedPersoneSearchSuccessAction({ data: trustedPersones }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              trustedPersoneSearchFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Получение текущего доверенного лица
  getTrustedPersoneCurrent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trustedPersoneGetCurrent),
      switchMap((id) => {
        return this.clientsLaw.getCurrentTrustedPersone(id.id).pipe(
          map((trustedPersone) => {
            return trustedPersoneGetCurrentSuccessAction({ data: trustedPersone });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              trustedPersoneGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление доверенного лица лица
  UpdateTrustedPersone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTrustedPersoneAction),
      switchMap(({ trustedPersone, files }) => {
        return this.clientsLaw.updateTrustedPersone(trustedPersone, files).pipe(
          map((trustedPersone) => {
            this.messageService.add({ severity: 'success', summary: `Доверенное лицо обновлено`, detail: 'Успешно!' });
            return updateTrustedPersoneSuccessAction({ data: trustedPersone });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateTrustedPersoneFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






}
