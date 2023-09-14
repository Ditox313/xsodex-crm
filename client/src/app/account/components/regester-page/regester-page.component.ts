import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserRequestRegister } from '../../types/account.interfaces';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector } from '../../store/selectors';


@Component({
  selector: 'app-regester-page',
  templateUrl: './regester-page.component.html',
  styleUrls: ['./regester-page.component.css']
})
export class RegesterPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formRegisterSub$!: Subscription
  isSubmittingSelector$!: Observable<boolean | null>
  isSubmittingSelectorValue!: boolean | null

  constructor(
    private messageService: MessageService, 
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) { }


  ngOnInit() {
    this.initForm()
    this.initValues()
  }
  

  ngOnDestroy() {
    if (this.formRegisterSub$) {
      this.formRegisterSub$.unsubscribe()
    }
    if (this.isSubmittingSelector$) {
      this.formRegisterSub$.unsubscribe()
    }
  }



  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
    });
  }


  initValues()
  {
    // Получаем селектор isSubmitting
    this.isSubmittingSelector$ = this.store.pipe(select(isSubmittingSelector))
    this.isSubmittingSelector$.subscribe(isSubmitting => {
      this.isSubmittingSelectorValue = isSubmitting
    }) 
  }


  

  onSubmit() {
    this.form.disable();

    const user: UserRequestRegister = {
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      name: this.form.value.name,
      secondName: this.form.value.secondName,
      lastName: this.form.value.lastName,
    };

    this.store.dispatch(registerAction({ user }))

    this.formRegisterSub$ = this.authService.register(user).subscribe({
      next: (user) => {
        this.router.navigate(['/login-page'], {
          queryParams: {
            registered: true
          }
        })
        this.form.enable();
      },
      error: (error) => {
        console.warn(error);
        this.messageService.add({ severity: 'error', summary: `${error.error.message}`, detail: 'Попробуйте еще раз' });
        this.form.enable();
      }
    });
  }
}
