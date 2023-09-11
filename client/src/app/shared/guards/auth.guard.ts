// Гуард защиты роутов

import { AuthService } from '../../account/services/auth.service';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"  // Регистрируем данный сервис в главном файле модуль
})
export class AuthGuard {

    // Инжектируем необходимые сервисы
    constructor(private auth: AuthService, private router: Router) { }

    // Функция-гуард, выполняющая проверку аутентификации
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuthentication();
    }

    // Функция-гуард для детей, использующая ту же логику проверки аутентификации
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkAuthentication();
    }

    // Функция проверки аутентификации
    private checkAuthentication(): Observable<boolean> {
        // Проверяем есть ли у пользователя токен (то есть зарегистрирован ли он)
        if (this.auth.isAuthenticated()) {
            return of(true); // Обернули ответ true в виде стрима
        } else {
            // Редирект пользователя на страницу логина если он не имеет токена. С определенным параметром для отображения сообщения
            this.router.navigate(['/login-page'], {
                queryParams: {
                    accessDenied: true
                }
            });

            return of(false);
        }
    }
}
