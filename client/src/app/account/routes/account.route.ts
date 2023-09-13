import { AuthLayoutComponent } from "src/app/shared/modules/layouts/components/auth-layout/auth-layout.component";
import { Route } from "src/app/shared/types/interfaces";
import { LoginPageComponent } from "../components/login-page/login-page.component";
import { RegesterPageComponent } from "../components/regester-page/regester-page.component";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { AccountSettingPageComponent } from "../components/account-setting-page/account-setting-page.component";

export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AuthLayoutComponent,
            children: [
                {
                    path: '',
                    redirectTo: '/login-page',
                    pathMatch: 'full',
                },
                {
                    path: 'login-page',
                    component: LoginPageComponent,
                },
                {
                    path: 'register-page',
                    component: RegesterPageComponent,
                },
            ],
        },

        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
            children: [
                {
                    path: 'account-settings-page',
                    component: AccountSettingPageComponent,
                },
            ],
        },

    ];
}

