import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { updateUserAction, updateUserFailureAction, updateUserSuccessAction } from '../actions/updateUser.action'




@Injectable()
export class UpdateUserEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
    ) { }

    UpdateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUserAction),
            switchMap(({ user, avatar }) => {
                return this.authService.updateUser(user, avatar).pipe(
                    map((data) => {
                        this.messageService.add({ severity: 'success', summary: `Пользователь обновлен`, detail: 'Успешно!' });
                        return updateUserSuccessAction({ data: data });
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        this.messageService.add({ severity: 'error', summary: `Ошибка обновления`, detail: 'Попробуйте еще раз' });
                        return of(
                            updateUserFailureAction({ errors: errorResponse.error.errors })
                        );
                    })
                );
            })
        )
    );
}
