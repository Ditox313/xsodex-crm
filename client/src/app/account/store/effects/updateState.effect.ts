import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { updateStateAction, updateStateFailureAction, updateStateSuccessAction } from '../actions/updateState.action'




@Injectable()
export class UpdateStateEffect {
    constructor(
        private actions$: Actions,
        private messageService: MessageService,
    ) { }

    updateState$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateStateAction),
                map(() => {
                    const savedState: any = localStorage.getItem('appState');
                    
                    return updateStateSuccessAction({ data: JSON.parse(savedState) })
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(
                        updateStateFailureAction({ errors: 'Ошибка обновления состояния' })
                    );
                })
            ),
    );
}
