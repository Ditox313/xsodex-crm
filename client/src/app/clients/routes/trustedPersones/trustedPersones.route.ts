
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../../shared/guards/auth.guard";
import { ListTrustedPersoneComponent } from "../../components/trusted-persones/list-trusted-persone/list-trusted-persone.component";
import { AddTrustedPersoneComponent } from "../../components/trusted-persones/add-trusted-persone/add-trusted-persone.component";
import { ShowTrustedPersoneComponent } from "../../components/trusted-persones/show-trusted-persone/show-trusted-persone.component";










export function getRoutesTrustedPersones(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-trusted-persone/:id',
                    component: AddTrustedPersoneComponent,
                },
                {
                    path: 'list-trusted-persones/:id',
                    component: ListTrustedPersoneComponent,
                },
                {
                    path: 'show-trusted-persone/:id', 
                    component: ShowTrustedPersoneComponent,
                },
                // {
                //     path: 'trusted-persones-all',
                //     component: ListTrustedPersoneComponent,
                // },
                // {
                //     path: 'show-client-fiz/:id', 
                //     component: ShowClientFizComponent,
                // },
                // {
                //     path: 'list-dogovors-clients-fiz/:id',
                //     component: ListDogovorsClientsFizComponent,
                // },
                // {
                //     path: 'add-dogovor-client-fiz/:id',
                //     component: AddDogovorClientFizComponent,
                // },
                // {
                //     path: 'show-dogovor-client-fiz/:id',
                //     component: ShowDogovorClientFizComponent,
                // },
                // {
                //     path: 'list-acts-client-fiz/:id',
                //     component: ListActsClientFizComponent,
                // },
                // {
                //     path: 'list-bookings-client-fiz/:id',
                //     component: ListBookingsClientFizComponent,
                // },
                
                
            ],
        },

    ];
}

