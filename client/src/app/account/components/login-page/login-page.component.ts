import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  formLoginSub$!: Subscription; 
  timer_for_toast: any;//Таймер для вывода toasts для формы логина



  constructor(private messageService: MessageService, 
  private router: Router,
  private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.initionalForm()
  }

  initionalForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  
  // Функция для вывода toasts для формы логина
  onValidValue(e: Event) {
    if (this.timer_for_toast) {
      clearTimeout(this.timer_for_toast);
    }

    this.timer_for_toast = setTimeout(() => {
      if (this.form.controls['email'].errors?.['required']) {
        this.messageService.add({ severity: 'error', summary: 'Email не должен быть пустым', detail: 'Попробуйте заново' });
      }
      else if (this.form.controls['email'].errors?.['email'])
      {
        this.messageService.add({ severity: 'error', summary: 'Введите корректный Email', detail: 'Попробуйте заново' });
      }
      else if (this.form.controls['password'].errors?.['required']) {
        this.messageService.add({ severity: 'error', summary: 'Пароль не должен быть пустым', detail: 'Попробуйте заново' });
      }
      else if (this.form.controls['password'].errors?.['minlength']) {
        this.messageService.add({ severity: 'error', summary: 'Минимальная длина пароля 6 символов', detail: 'Попробуйте заново' });
      }
      
    }, 1500);
  }


  onSubmit()
  {

  }


}
