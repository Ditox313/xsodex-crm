
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { AddSmenaComponent } from "../components/add-smena/add-smena.component";
import { ListSmenaComponent } from "../components/list-smena/list-smena.component";
import { ShowSmenaComponent } from "../components/show-smena/show-smena.component";
import { GeneralReportAllSmenaComponent } from "../components/general-report-all-smena/general-report-all-smena.component";

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
                {
                    path: 'list-smena',
                    component: ListSmenaComponent,
                },
                {
                    path: 'pays-list-for-general-report-smena',
                    component: GeneralReportAllSmenaComponent,
                },
                {
                    path: 'show-smena/:id', 
                    component: ShowSmenaComponent,
                },
            ],
        },

    ];
}

