
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../../shared/guards/auth.guard";
import { AddClientFizComponent } from "../../components/clientsFiz/add-client-fiz/add-client-fiz.component";
import { ListClientsFizComponent } from "../../components/clientsFiz/list-clients-fiz/list-clients-fiz.component";




export function getRoutesClientsFiz(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-client-fiz',
                    component: AddClientFizComponent,
                },
                {
                    path: 'list-clients-fiz',
                    component: ListClientsFizComponent,
                },
                // {
                //     path: 'show-partner/:id', 
                //     component: ShowPartnerComponent,
                // },
            ],
        },

    ];
}

