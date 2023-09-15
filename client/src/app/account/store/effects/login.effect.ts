import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import { MessageService } from 'primeng/api'
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from 'src/app/account/store/actions/login.action';
import {AuthService} from '../../services/auth.service'
import {of} from 'rxjs'
import {Router} from '@angular/router'




@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService, 
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction), 
      switchMap(({ user }) => {
        return this.authService.login(user).pipe(
          map((data) => {
            return loginSuccessAction({data: data}); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: `${errorResponse.error.message}`, detail: 'Попробуйте еще раз' });
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(['/account-settings-page']);
        })
      ),
    { dispatch: false }
  );
}
