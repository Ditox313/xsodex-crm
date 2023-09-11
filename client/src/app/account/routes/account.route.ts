import { AuthLayoutComponent } from "src/app/shared/modules/layouts/components/auth-layout/auth-layout.component";
import { Route } from "src/app/shared/types/interfaces";
import { LoginPageComponent } from "../components/login-page/login-page.component";
import { RegesterPageComponent } from "../components/regester-page/regester-page.component";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { SettingsAccountComponent } from "../components/settings-account/settings-account.component";

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
        
        // {
        //     path: '',
        //     component: AppLayoutComponent,
        //     children: [
        //         {
        //             path: 'settings-account-page',
        //             component: SettingsAccountComponent,
        //         },
        //     ],
        // },
    ];
}
