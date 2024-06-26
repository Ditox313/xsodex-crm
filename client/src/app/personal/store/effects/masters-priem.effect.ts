import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap, concatMap, delay} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { MastersPriemService } from '../../services/masters-priem.service'
import { addMasterPriemAction, addMasterPriemFailureAction, addMasterPriemSuccessAction, masterPriemDeleteAction, masterPriemDeleteFailureAction, masterPriemDeleteSuccessAction, masterPriemGetCurrent, masterPriemGetCurrentFailureAction, masterPriemGetCurrentSuccessAction, mastersPriemListAction, mastersPriemListFailureAction, mastersPriemListNoParamsAction, mastersPriemListNoParamsFailureAction, mastersPriemListNoParamsSuccessAction, mastersPriemListSuccessAction, noMoreMastersPriemListAction, updateMasterPriemAction, updateMasterPriemFailureAction, updateMasterPriemSuccessAction, updateStateMastersPriemAction, updateStateMastersPriemFailureAction, updateStateMastersPriemSuccessAction } from '../actions/masters-priem.action'






@Injectable()
export class MastersPriemEffect {

  
  constructor(
    private actions$: Actions,
    private router: Router,
    private messageService: MessageService, 
    private mastersPriem: MastersPriemService,
  ) {}




  // Добавить мастера приемщика
  addMasterPriem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addMasterPriemAction), 
    switchMap(({ masterPriem }) => {
      return this.mastersPriem.createMasterPriem(masterPriem).pipe(
        map((masterPriem) => {
          this.messageService.add({ severity: 'success', summary: `Мастер приемщик создан`, detail: 'Успешно!' });
          this.router.navigate(['/list-masters-priem']);
          return addMasterPriemSuccessAction({ masterPriem: masterPriem }); 
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            addMasterPriemFailureAction({ errors: errorResponse.error.errors })
          );
        })
      );
    })
  )
);






  // Получение всех мастеров приемщиков
  mastersPriemList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mastersPriemListAction),
      concatMap((params) => {
        return this.mastersPriem.getAllMastersPriem({ params }).pipe(
          concatMap((mastersPriemList) => {
            if (mastersPriemList.length === 0) {
              return of(noMoreMastersPriemListAction({ data: true }));
            }
            return of(mastersPriemListSuccessAction({ data: mastersPriemList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              mastersPriemListFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Удаление мастера приемщика
  masterPriemDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(masterPriemDeleteAction),
      switchMap((id) => {
        return this.mastersPriem.deleteMasterPriem(id.id).pipe(
          map((id) => {
            this.messageService.add({ severity: 'success', summary: `Мастер приемщик удален`, detail: 'Успешно!' });
            return masterPriemDeleteSuccessAction({ data: id });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка удаления мастера приемщика`, detail: 'Попробуйте позже!' });
            return of(
              masterPriemDeleteFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );





  // Обновление состояния
  updateStateMastersPriem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateMastersPriemAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');
          return updateStateMastersPriemSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateMastersPriemFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );







  // Получение текущего мастера приемщика
  getMasterPriem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(masterPriemGetCurrent),
      switchMap((id) => {
        return this.mastersPriem.getByIdMasterPriem(id.id).pipe(
          map((masterPriem) => {
            return masterPriemGetCurrentSuccessAction({ data: masterPriem });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              masterPriemGetCurrentFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );






  // Обновление мастера приемщика
  UpdateMasterPriem$ =  createEffect(() =>
    this.actions$.pipe(
      ofType(updateMasterPriemAction),
      switchMap(({ masterPriem}) => {
        return this.mastersPriem.updateMasterPriem(masterPriem).pipe(
          map((data) => {
            this.messageService.add({ severity: 'success', summary: `Мастер приемщик обновлен`, detail: 'Успешно!' });

            return updateMasterPriemSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
            return of(
              updateMasterPriemFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );











  // Получение всех мастеров приемщиков без параметров
  mastersPriemNoParamsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mastersPriemListNoParamsAction),
      concatMap((params) => {
        return this.mastersPriem.getAllMastersPriemNoParams().pipe(
          concatMap((mastersPriemList) => {
            return of(mastersPriemListNoParamsSuccessAction({ data: mastersPriemList }));
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              mastersPriemListNoParamsFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );




}
