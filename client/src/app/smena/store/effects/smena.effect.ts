import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { paysListForSmenaFailureAction, isOpenedSmenaAction, isOpenedSmenaSuccessAction, noMoreSmenaListAction, openSmenaAction, openSmenaFailureAction, openSmenaSuccessAction, paysListForSmenaAction, paysListForSmenaSuccessAction, smenaCloseAction, smenaCloseFailureAction, smenaCloseSuccessAction, smenaDeleteAction, smenaDeleteFailureAction, smenaDeleteSuccessAction, smenaGetCurrent, smenaGetCurrentFailureAction, smenaGetCurrentSuccessAction, smenaListAction, 
  smenaListFailureAction,  smenaListSuccessAction, updateStateSmenaAction, updateStateSmenaFailureAction, updateStateSmenaSuccessAction, 
  paysListForGeneralReportAction,
  paysListForGeneralReportSuccessAction,
  paysListForGeneralReportFailureAction} from '../actions/smena.action'
import { SmenaService } from '../../services/smena.service'




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



  // Получение смны со статусом OPEN
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



  // Получение всех платежей за смену
  paysListForSmena$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paysListForSmenaAction),
      concatMap((action) => {
        return this.smena.getAllSmenaPays(action.smenaId).pipe(
          concatMap((paysList) => {
            return of(paysListForSmenaSuccessAction({ data: paysList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              paysListForSmenaFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




// Получение всех платежей для генерального отчета
  paysLisForGeneralReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(paysListForGeneralReportAction),
      concatMap(() => {
        return this.smena.getAllPaysForgeneralReport().pipe(
          map((paysList) => paysListForGeneralReportSuccessAction({ data: paysList })),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              paysListForGeneralReportFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




  // Удаление смены
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





  // Получение текущей смены
  getCurrentSmena$ = createEffect(() =>
    this.actions$.pipe(
      ofType(smenaGetCurrent),
      switchMap((id) => {
        return this.smena.getById(id.id).pipe(
          map((smena) => {
            return smenaGetCurrentSuccessAction({ data: smena });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              smenaGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );







  // Закрытие смены
  smenaClose$ = createEffect(() =>
    this.actions$.pipe(
      ofType(smenaCloseAction),
      switchMap((data) => {
        return this.smena.close(data.id, data.close_date).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Смена Закрыта`, detail: 'Успешно!' });
            this.router.navigate(['/list-smena']);
            return smenaCloseSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка закрытия смены`, detail: 'Попробуйте позже!' });
            return of(
              smenaCloseFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );


}
