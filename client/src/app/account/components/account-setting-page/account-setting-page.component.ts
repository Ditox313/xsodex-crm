import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserResponceRegister } from '../../types/account.interfaces';
import { Store, select } from '@ngrx/store';
import { currentUserSelector, isLoadingSelector } from '../../store/selectors';
import { updateUserAction } from '../../store/actions/account.action';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-account-setting-page',
  templateUrl: './account-setting-page.component.html',
  styleUrls: ['./account-setting-page.component.css']
})
export class AccountSettingPageComponent {
  title: string = 'Настройки аккаунта'
  form!: FormGroup; 
  isLoadingSelector$!: Observable<boolean | null>
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  uploadFile!: File
  avatar: string | ArrayBuffer | undefined | null = '' ;
  @ViewChild('upload') upload!: ElementRef;
  authToken: string | null = null;
  showApiModal: boolean = false;



  // Список api маршрутов
  apiBaseUrl: string = 'http://localhost:4200';
  apiList = [
    { description: 'Получение всех смен', path: '/api/smena/smena-list' },
    { description: 'Получение всех платежей', path: '/api/smena/pays-list-for-general-report' },
    { description: 'Получение всех автомобилей', path: '/api/cars/cars-list' },
    { description: 'Получение всех броней', path: '/api/bookings/bookings-list' },
    { description: 'Получение всех клиентов (физ.лиц)', path: '/api/clientsFiz/clientsFiz-list' },
    { description: 'Получение всех клиентов (юр.лиц)', path: '/api/clientsLaw/clientsLaw-list' },
    { description: 'Получение всех партнеров', path: '/api/partners/partners-list' },
    { description: 'Получение всех мастеров приемщиков', path: '/api/personal/masters-priem-list' },
    { description: 'Настройки автопарка', path: '/api/settings/settings-avtopark-list' },
    { description: 'Настройки склада', path: '/api/settings/settings-sklad-list' },
    { description: 'Глобальные настройки', path: '/api/settings/settings-global-list' },
  ];






  constructor(private store: Store, private messageService: MessageService, ) { }

  ngOnInit(): void {
    this.initionalForm();
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }
  }

  initionalForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      doverenostNumber: new FormControl(null),
      doverenostNumber2: new FormControl(null),
      doverenostDate: new FormControl(null),
      doverenostDate2: new FormControl(null),
    });
  }

  initValues() {
    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
        
        if(user)
        {
          this.pathValueUser(user)
        }
      }
    })
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))

    this.authToken = localStorage.getItem('auth-token');
  }

  // Получение токена
  copyToken(): void {
    const fullToken = localStorage.getItem('auth-token');
    if (!fullToken) return;
  
    const token = fullToken.replace(/^Bearer\s+/i, '');
  
    try {
      const textarea = document.createElement('textarea');
      textarea.value = token;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
  
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
  
      this.messageService.add({
        severity: successful ? 'success' : 'warn',
        summary: successful ? 'Токен скопирован' : 'Не удалось скопировать',
        detail: 'Успешно!'
      });
    } catch (err: unknown) {
      let message = 'Неизвестная ошибка';
      if (err instanceof Error) {
        message = err.message;
      }
  
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка копирования',
        detail: message
      });
    }
  }
  


  // Копируем маршрут api
  // Копируем маршрут API с fallback для HTTP
copyPath(path: string): void {
  if (navigator.clipboard && window.isSecureContext) {
    // Современный метод (работает только через HTTPS или localhost)
    navigator.clipboard.writeText(path).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Путь скопирован',
        detail: 'Успешно!'
      });
    }).catch(err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка копирования',
        detail: err.message || 'Не удалось скопировать путь'
      });
    });
  } else {
    // Fallback для HTTP
    try {
      const textarea = document.createElement('textarea');
      textarea.value = path;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      this.messageService.add({
        severity: successful ? 'success' : 'warn',
        summary: successful ? 'Путь скопирован' : 'Не удалось скопировать',
        detail: 'Успешно!'
      });
    } catch (err: unknown) {
      let message = 'Неизвестная ошибка';
      if (err instanceof Error) {
        message = err.message;
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка копирования',
        detail: message
      });
    }
  }
}




  // Обрабатываем загрузку картинок
  onFileUploadAvatar(event: any) {
    const file = event.target.files['0'];
    this.uploadFile = file;
    // Подключаем ридер для считывания картинки
    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.avatar = reader.result;
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClickForUploadAvatar() {
    this.upload.nativeElement.click();
  }

  pathValueUser(user: UserResponceRegister)
  {
    this.form.patchValue({
      email: user.email,
      phone: user.phone,
      name: user.name,
      secondName: user.secondName,
      lastName: user.lastName,
      doverenostNumber: user.doverenostNumber,
      doverenostNumber2: user.doverenostNumber2,
      doverenostDate: user.doverenostDate,
      doverenostDate2: user.doverenostDate2,
    });

    this.avatar = user.avatar
  }




  onSubmitProfile()
  {
    const user: UserResponceRegister = {
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password,
      name: this.form.value.name,
      secondName: this.form.value.secondName,
      lastName: this.form.value.lastName,
      doverenostNumber: this.form.value.doverenostNumber,
      doverenostNumber2: this.form.value.doverenostNumber2,
      doverenostDate: this.form.value.doverenostDate,
      doverenostDate2: this.form.value.doverenostDate2,
    };

    this.store.dispatch(updateUserAction({ user, avatar: this.uploadFile }))
  }
}
