
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListPartnersComponent } from "../components/list-partners/list-partners.component";
import { AddPartnerComponent } from "../components/add-partner/add-partner.component";
import { ShowPartnerComponent } from "../components/show-partner/show-partner.component";



export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-partner',
                    component: AddPartnerComponent,
                },
                {
                    path: 'list-partners',
                    component: ListPartnersComponent,
                },
                {
                    path: 'show-partner/:id', 
                    component: ShowPartnerComponent,
                },
            ],
        },

    ];
}

