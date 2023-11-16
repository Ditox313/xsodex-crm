import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { ClientsFizService } from 'src/app/clients/services/clientsFiz/clientsFiz.service'
import { addClientFizAction, addClientFizFailureAction, addClientFizSuccessAction, clientFizDeleteAction, clientFizDeleteFailureAction, clientFizDeleteSuccessAction, clientFizGetCurrent, clientFizGetCurrentFailureAction, clientFizGetCurrentSuccessAction, clientsFizListAction, clientsFizListFailureAction, clientsFizListSuccessAction, noMoreClientsFizListAction, updateStateClientsFizAction, updateStateClientsFizFailureAction, updateStateClientsFizSuccessAction } from '../../actions/actionsClientsFiz/clientsFiz.action'





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
      switchMap(({ clientFiz, file_1, file_2, file_3, file_4 }) => {
        return this.clientsFiz.create(clientFiz, file_1, file_2, file_3, file_4).pipe(
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
            this.messageService.add({ severity: 'success', summary: `Партнер удален`, detail: 'Успешно!' });
            return clientFizDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления партнера`, detail: 'Попробуйте позже!' });
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
  //             updateStatePartnersFailureAction({ errors: errorResponse.error.errors })
  //           );
  //         })
  //       );
  //     })
  //   )
  // );




}
