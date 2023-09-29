import { AfterViewInit, ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { UserRequestLogin } from '../../types/account.interfaces';
import { Store, select } from '@ngrx/store';
import { loginAction } from '../../store/actions/login.action';
import { isLoadingSelector } from '../../store/selectors';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit, OnDestroy, AfterViewInit {

  form!: FormGroup;
  formLoginSub$!: Subscription
  paramsSub$!: Subscription
  params!: any
  isLoadingSelector$!: Observable<boolean | null>



  constructor(
  private messageService: MessageService, 
  private route: ActivatedRoute,
  private changeDetectorRef: ChangeDetectorRef,
  private store: Store
  ) {}

  ngOnInit(): void {
    this.initionalForm()
    this.initValues()
  }

  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }

  ngAfterViewInit(): void {
    this.getParams()
  }

  ngOnDestroy() {
    if (this.formLoginSub$) {
      this.formLoginSub$.unsubscribe();
    }
    if (this.paramsSub$) {
      this.paramsSub$.unsubscribe();
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
    this.paramsSub$ = this.route.queryParams.subscribe({
      next: (params: Params) => {
        if (params['registered']) {
          this.messageService.add({ severity: 'success', summary: 'Теперь вы можете зайти в систему используя свои данные', detail: 'Поздравляем!' });
        } else if (params['accessDenied']) {
          this.messageService.add({ severity: 'error', summary: 'Сначала авторизируйтесь в системе', detail: 'Введите свои данные' });
        } else if (params['sessionFailed']) {
          this.messageService.add({ severity: 'error', summary: 'Пожалуйста войдите в систему заново', detail: 'Попробуйте еще раз' });
        }
      }
    });

    this.changeDetectorRef.detectChanges(); // Запускаем обнаружение изменений.Делается что бы работал messageService
  }


  // Отправка формы
  onSubmit()
  {
    const user: UserRequestLogin = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.store.dispatch(loginAction({ user }))
    
  }


}
