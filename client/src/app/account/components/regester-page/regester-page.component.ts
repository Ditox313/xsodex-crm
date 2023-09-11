import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserRequestRegister } from '../../types/auth.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regester-page',
  templateUrl: './regester-page.component.html',
  styleUrls: ['./regester-page.component.css']
})
export class RegesterPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formRegisterSub$!: Subscription; 
  timer_for_toast: any; //Таймер для вывода toasts для формы регистрации

  constructor(
    private messageService: MessageService, 
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.formRegisterSub$) {
      this.formRegisterSub$.unsubscribe();
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

  // Функция для вывода toasts для формы логина
  onValidValue(e: Event) {
    if (this.timer_for_toast) {
      clearTimeout(this.timer_for_toast);
    }

    this.timer_for_toast = setTimeout(() => {
      if (this.form.controls['email'].errors?.['required']) {
        this.messageService.add({ severity: 'warn', summary: 'Введите E-mail ', detail: 'Email не должен быть пустым!' });
      }
      else if (this.form.controls['email'].errors?.['email']) {
        this.messageService.add({ severity: 'warn', summary: 'Введите корректный Email', detail: 'E-mail должен содержать - @' });
      }
      else if (this.form.controls['password'].errors?.['required']) {
        this.messageService.add({ severity: 'warn', summary: 'Введите пароль длинной от 6 символов ', detail: 'Пароль не должен быть пустым!' });
      }
      else if (this.form.controls['password'].errors?.['minlength']) {
        this.messageService.add({ severity: 'warn', summary: 'Минимальная длина пароля 6 символов', detail: 'проверьте колличество символов' });
      }
      else if (this.form.controls['phone'].errors?.['required']) {
        this.messageService.add({ severity: 'warn', summary: 'Введите телефон ', detail: 'Телефон не должен быть пустым!' });
      }
      else if (this.form.controls['name'].errors?.['required']) {
        this.messageService.add({ severity: 'warn', summary: 'Введите имя ', detail: 'Имя не должно быть пустым!' });
      }
      else if (this.form.controls['secondName'].errors?.['required']) {
        this.messageService.add({ severity: 'warn', summary: ' Введите фамилия', detail: 'Фамилия не должна быть пустой!' });
      }
      else if (this.form.controls['lastName'].errors?.['required']) {
        this.messageService.add({ severity: 'warn', summary: ' Введите отчество', detail: 'Отчество не должно быть пустым!' });
      }
      

    }, 1500);
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
