import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { of } from 'rxjs'
import { updateStateSmenaAction, updateStateSmenaFailureAction, updateStateSmenaSuccessAction } from '../actions/updateState.action'




@Injectable()
export class UpdateStateSmenaEffect {
    constructor(
        private actions$: Actions,
    ) { }

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
}
