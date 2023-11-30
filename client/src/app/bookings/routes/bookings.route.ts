
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListBookinhsComponent } from "../components/list-bookinhs/list-bookinhs.component";




export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                // {
                //     path: 'add-partner',
                //     component: AddPartnerComponent,
                // },
                {
                    path: 'list-bookings',
                    component: ListBookinhsComponent,
                },
                // {
                //     path: 'show-partner/:id', 
                //     component: ShowPartnerComponent,
                // },
            ],
        },

    ];
}

