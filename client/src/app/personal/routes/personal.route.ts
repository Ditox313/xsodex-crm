
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListMastersPriemComponent } from "../components/masters-priem/list-masters-priem/list-masters-priem.component";
import { AddMasterPriemComponent } from "../components/masters-priem/add-master-priem/add-master-priem.component";
import { ShowMasterPriemComponent } from "../components/masters-priem/show-master-priem/show-master-priem.component";





export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-master-priem',
                    component: AddMasterPriemComponent,
                },
                {
                    path: 'list-masters-priem',
                    component: ListMastersPriemComponent,
                },
                {
                    path: 'show-master-priem/:id', 
                    component: ShowMasterPriemComponent,
                },
            ],
        },

    ];
}

