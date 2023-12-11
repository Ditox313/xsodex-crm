import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { ClientsLawService } from 'src/app/clients/services/clientsLaw/clientsLaw.service'
import { addClientLawAction, addClientLawDogovorAction, addClientLawDogovorActionFromBooking, addClientLawDogovorFailureAction, addClientLawDogovorSuccessAction, addClientLawFailureAction, addClientLawSuccessAction, clientLawDeleteAction, clientLawDeleteFailureAction, clientLawDeleteSuccessAction, clientLawDogovorDeleteAction, clientLawDogovorDeleteFailureAction, clientLawDogovorDeleteSuccessAction, clientLawDogovorGetCurrent, clientLawDogovorGetCurrentFailureAction, clientLawDogovorGetCurrentSuccessAction, clientLawDogovorsListAction, clientLawDogovorsListFailureAction, clientLawDogovorsListSuccessAction, clientLawGetCurrent, clientLawGetCurrentFailureAction, clientLawGetCurrentSuccessAction, clientsLawListAction, clientsLawListFailureAction, clientsLawListSuccessAction, clientsLawSearchAction, clientsLawSearchFailureAction, clientsLawSearchSuccessAction, noMoreClientLawDogovorsListAction, noMoreClientsLawListAction, updateClientLawAction, updateClientLawFailureAction, updateClientLawSuccessAction, updateStateClientsLawAction, updateStateClientsLawFailureAction, updateStateClientsLawSuccessAction } from '../../actions/actionsClientsLaw/clientsLaw.action'





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
      switchMap(({ clientLaw, file_1, file_2, file_3, file_4 }) => {
        return this.clientsLaw.create(clientLaw, file_1, file_2, file_3, file_4).pipe(
          map((clientLaw) => {
            this.messageService.add({ severity: 'success', summary: `Клиент создан`, detail: 'Успешно!' });
            this.router.navigate(['/list-clients-law']);
            return addClientLawSuccessAction({ clientLaw: clientLaw }); 
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
      switchMap(({ clientLaw, file_1, file_2, file_3, file_4 }) => {
        return this.clientsLaw.update(clientLaw, file_1, file_2, file_3, file_4).pipe(
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
          concatMap((clientsFizList) => {
            return of(clientsLawSearchSuccessAction({ data: clientsFizList }));
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




}
