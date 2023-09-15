import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, tap } from 'rxjs';
import { UserRequestLogin, UserRequestRegister, UserResponceLogin, UserResponceRegister } from '../types/account.interfaces';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class AuthService {
  private token:string = ''; //В эту переменную получим токет, который придет как ответ из функции login

  constructor(private http: HttpClient) {}

  // Регистрация пользователя
  register(user: UserRequestRegister): Observable<UserRequestRegister> {
    return this.http.post<UserResponceRegister>('/api/account/auth/register', user);
  }



  // Авторизация пользователя
  login(user: UserRequestLogin): Observable<{ token: string; currentUser: UserRequestLogin }> {
    return this.http.post<UserResponceLogin>('/api/account/auth/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token); //Добавляем токен в localStorage
          this.setToken(token);
        })
      );
  }


  // Изменят приватную переменную token
  setToken(token: string) {
    this.token = token;
  }

  // Что бы получать токен в других классах и использовать его(Что бы добовлять его к различным запросам)
  getToken(): string {
    return this.token;
  }

  // Определяем находится ли пользователь в сессии(Есть токен или нет)
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Выход из системы
  logout() {
    this.setToken('');
    localStorage.clear();
  }

  // Делаем запрос на сервер, получаем  ответ типа User
  // get_user(): Observable<User > {
  //   return this.http.get<User>('/api/auth/user')
  // }

  // Редактируем позицию
  // update(user: User): Observable<User> {
  //   return this.http.patch<any>('/api/auth/update/', user);
  // }



}