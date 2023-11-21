import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { ClientsLawService } from 'src/app/clients/services/clientsLaw/clientsLaw.service'
import { addClientLawAction, addClientLawFailureAction, addClientLawSuccessAction, clientLawDeleteAction, clientLawDeleteFailureAction, clientLawDeleteSuccessAction, clientsLawListAction, clientsLawListFailureAction, clientsLawListSuccessAction, clientsLawSearchAction, clientsLawSearchFailureAction, clientsLawSearchSuccessAction, noMoreClientsLawListAction } from '../../actions/actionsClientsLaw/clientsLaw.action'





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
  // updateStateClientsFiz$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(updateStateClientsFizAction),
  //       map(() => {
  //         const savedState: any = localStorage.getItem('appState');
  //         return updateStateClientsFizSuccessAction({ data: JSON.parse(savedState) })
  //       }),
  //       catchError((errorResponse: HttpErrorResponse) => {
  //         return of(
  //           updateStateClientsFizFailureAction({ errors: 'Ошибка обновления состояния' })
  //         );
  //       })
  //     ),
  // );







  // Получение текущего физического лица
  // getClientFizCurrent$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(clientFizGetCurrent),
  //     switchMap((id) => {
  //       return this.clientsFiz.getById(id.id).pipe(
  //         map((clientFiz) => {
  //           return clientFizGetCurrentSuccessAction({ data: clientFiz });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             clientFizGetCurrentFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );






  // Обновление физического лица
  // UpdateClientFiz$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(updateClientFizAction),
  //     switchMap(({ clientFiz, file_1, file_2, file_3, file_4 }) => {
  //       return this.clientsFiz.update(clientFiz, file_1, file_2, file_3, file_4).pipe(
  //         map((data) => {
  //           this.messageService.add({ severity: 'success', summary: `Клиент обновлен`, detail: 'Успешно!' });
  //           return updateClientFizSuccessAction({ data: data });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
  //           return of(
  //             updateClientFizFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );






  // Создание договора
  // addClientFizDogovor$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addClientFizDogovorAction),
  //     switchMap(({ dogovor }) => {
  //       return this.clientsFiz.create_dogovor(dogovor).pipe(
  //         map((dogovor) => {
  //           this.messageService.add({ severity: 'success', summary: `Договор создан`, detail: 'Успешно!' });
  //           this.router.navigate([`/list-dogovors-clients-fiz/${dogovor.client}`]);
  //           return addClientFizDogovorSuccessAction();
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             addClientFizDogovorFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );









  // Получение всех договоров для физлица
  // clientFizDogovorsList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(clientFizDogovorsListAction),
  //     concatMap((params) => {
  //       return this.clientsFiz.get_all_dogovors({ params }).pipe(
  //         concatMap((clientsFizDogovorsList) => {
  //           if (clientsFizDogovorsList.length === 0) {
  //             return of(noMoreClientFizDogovorsListAction({ data: true }));
  //           }
  //           return of(clientFizDogovorsListSuccessAction({ data: clientsFizDogovorsList }));
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             clientFizDogovorsListFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );





  // Удаление договора
  // clientFizDogovorDelete$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(clientFizDogovorDeleteAction),
  //     switchMap((id) => {
  //       return this.clientsFiz.delete_dogovor(id.id).pipe(
  //         map((id) => {
  //           this.messageService.add({ severity: 'success', summary: `Договор удален`, detail: 'Успешно!' });
  //           return clientFizDogovorDeleteSuccessAction({ data: id });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           this.messageService.add({ severity: 'error', summary: `Ошибка удаления договора`, detail: 'Попробуйте позже!' });
  //           return of(
  //             clientFizDogovorDeleteFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );





  // Получение текущего договора
  // getClientFizDogovorCurrent$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(clientFizDogovorGetCurrent),
  //     switchMap((id) => {
  //       return this.clientsFiz.getDogovorById(id.id).pipe(
  //         map((dogovor) => {
  //           return clientFizDogovorGetCurrentSuccessAction({ data: dogovor });
  //         }),
  //         catchError((errorResponse: HttpErrorResponse) => {
  //           return of(
  //             clientFizDogovorGetCurrentFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );






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
