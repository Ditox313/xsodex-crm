import {Injectable, OnInit} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {Observable, Subscription, of} from 'rxjs'
import {Router} from '@angular/router'
import { isOpenedSmenaAction, isOpenedSmenaSuccessAction, noMoreSmenaListAction, openSmenaAction, openSmenaFailureAction, openSmenaSuccessAction, smenaDeleteAction, smenaDeleteFailureAction, smenaDeleteSuccessAction, smenaListAction, 
  smenaListFailureAction,  smenaListSuccessAction, updateStateSmenaAction, updateStateSmenaFailureAction, updateStateSmenaSuccessAction } from '../actions/smena.action'
import { SmenaService } from '../../services/smena.service'
import { Smena } from '../../types/smena.interfaces'
import { Store, select } from '@ngrx/store'
import { smenaListSelector } from '../selectors'




@Injectable()
export class SmenaEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private smena: SmenaService,
  ) {}


  // Smena Open
  smenaOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openSmenaAction), 
      switchMap(({ smena }) => {
        return this.smena.open(smena).pipe(
          map((smena) => {
            this.messageService.add({ severity: 'success', summary: `Смена открыта`, detail: 'Успешно!' });
            this.router.navigate(['/list-smena']);
            return openSmenaSuccessAction({smena: smena}); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              openSmenaFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );



  // Is opened smena
  smenaisOpened$ = createEffect(() =>
    this.actions$.pipe(
      ofType(isOpenedSmenaAction),
      switchMap(() => {
        return this.smena.isOpenSmena().pipe(
          map((smena) => {
            return isOpenedSmenaSuccessAction({ smena: smena });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              openSmenaFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );



  // Обновление состояния
  updateStateSmena$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateSmenaAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateSmenaSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateSmenaFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );





  // Получение всех смен
  smenaList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(smenaListAction),
      concatMap((params) => {
        return this.smena.getAllSmena({params}).pipe(
          concatMap((smenaList) => {
            if (smenaList.length === 0) {
              return of(noMoreSmenaListAction({ data: true }));
            }
            return of(smenaListSuccessAction({ data: smenaList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              smenaListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




  // // Удаление всех смен
  smenaDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(smenaDeleteAction),
      switchMap((id) => {
        return this.smena.delete(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Смена удалена`, detail: 'Успешно!' });
            return smenaDeleteSuccessAction({  data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления смены`, detail: 'Попробуйте позже!' });
            return of(
              smenaDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );


}
