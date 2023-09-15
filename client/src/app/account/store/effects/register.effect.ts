import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction
} from '../actions/register.action'
import {AuthService} from '../../services/auth.service'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { MessageService } from 'primeng/api'
import { UserResponceRegister } from '../../types/account.interfaces'

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService, 
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ user }) => {
        return this.authService.register(user).pipe(
          map((currentUser: UserResponceRegister) => {
            this.router.navigate(['/login-page'], {
              queryParams: {
                registered: true,
              },
            });
            return registerSuccessAction(); 
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `${errorResponse.error.message}`, detail: 'Попробуйте еще раз' });
            return of(
              registerFailureAction({ errors: errorResponse.error.message })
            );
          })
        );
      })
    )
  );

}
