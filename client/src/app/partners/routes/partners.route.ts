
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListPartnersComponent } from "../components/list-partners/list-partners.component";



export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                // {
                //     path: 'add-car',
                //     component: ListPartnersComponent,
                // },
                {
                    path: 'list-partners',
                    component: ListPartnersComponent,
                },
                // {
                //     path: 'show-car/:id', 
                //     component: ShowCarComponent,
                // },
            ],
        },

    ];
}

