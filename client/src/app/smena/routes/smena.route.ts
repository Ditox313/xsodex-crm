import { AuthLayoutComponent } from "src/app/shared/modules/layouts/components/auth-layout/auth-layout.component";
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { AddSmenaComponent } from "../components/add-smena/add-smena.component";

export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-smena',
                    component: AddSmenaComponent,
                },
            ],
        },

    ];
}

