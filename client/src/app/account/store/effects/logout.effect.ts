import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { logoutAction, logoutFailureAction, logoutSuccessAction } from '../actions/logout.action'




@Injectable()
export class LogoutEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService,
    ) { }

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logoutAction),
            switchMap(() => {
                return this.authService.logout().pipe(
                    map((data) => {
                        this.router.navigate(['/login-page']);
                        return logoutSuccessAction();
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        this.messageService.add({ severity: 'error', summary: `Ошибка выхода из системы`, detail: 'Попробуйте еще раз' });
                        return of(
                            logoutFailureAction({ errors: 'Ошибка выхода из системы' })
                        );
                    })
                );
            })
        )
    )
}
