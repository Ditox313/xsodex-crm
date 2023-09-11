import { AfterViewInit, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserRequestLogin } from '../../types/auth.interfaces';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  formLoginSub$!: Subscription; 
  timer_for_toast: any; //Таймер для вывода toasts для формы логина



  constructor(
  private messageService: MessageService, 
  private router: Router,
  private route: ActivatedRoute,
  private authService: AuthService) {}

  ngOnInit(): void {
    this.initionalForm()
    this.getParams()
  }

  ngOnDestroy() {
    if (this.formLoginSub$) {
      this.formLoginSub$.unsubscribe();
    }
  }

  // Инициализация формы
  initionalForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // Получаем параметры
  getParams() {
    this.route.queryParams.subscribe( (params: Params) => {
      if (params['registered']) {
        this.messageService.add({ severity: 'success', summary: 'Теперь вы можете зайти в систему используя свои данные', detail: 'Поздравляем!' });
      } else if (params['accessDenied']) {
        this.messageService.add({ severity: 'error', summary: 'Сначала авторизируйтесь в системе', detail: 'Попробуйте еще раз' });
      } else if (params['sessionFailed']) {
        this.messageService.add({ severity: 'error', summary: 'Пожалуйста войдите в систему заново', detail: 'Попробуйте еще раз' });
      }
    });
  }

  // Функция для вывода toasts для формы логина
  onValidValue(e: Event) {
    if (this.timer_for_toast) {
      clearTimeout(this.timer_for_toast);
    }

    this.timer_for_toast = setTimeout(() => {
      if (this.form.controls['email'].errors?.['required']) {
        this.messageService.add({ severity: 'error', summary: 'Email не должен быть пустым', detail: 'Введите E-mail' });
      }
      else if (this.form.controls['email'].errors?.['email'])
      {
        this.messageService.add({ severity: 'error', summary: 'Введите корректный Email', detail: 'E-mail должен содержать - @' });
      }
      else if (this.form.controls['password'].errors?.['required']) {
        this.messageService.add({ severity: 'error', summary: 'Пароль не должен быть пустым', detail: 'Введите пароль длинной от 6 символов' });
      }
      else if (this.form.controls['password'].errors?.['minlength']) {
        this.messageService.add({ severity: 'error', summary: 'Минимальная длина пароля 6 символов', detail: 'проверьте колличество символов' });
      }
      
    }, 1500);
  }

  // Отправка формы
  onSubmit()
  {
    this.form.disable();

    const user: UserRequestLogin = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.formLoginSub$ = this.authService.login(user).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: `Вы успешно авторизировались ${res.currentUser.name}`, detail: 'Поздравляем!' });
        this.form.enable();
      },
      error: (error) => {
        console.warn(error);
        this.messageService.add({ severity: 'error', summary: `Ошибка`, detail: 'Попробуйте еще раз' });
        this.form.enable();
      }
    });
  }


}
