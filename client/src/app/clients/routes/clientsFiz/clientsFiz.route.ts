
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../../shared/guards/auth.guard";
import { AddClientFizComponent } from "../../components/clients-fiz/add-client-fiz/add-client-fiz.component";
import { ListClientsFizComponent } from "../../components/clients-fiz/list-clients-fiz/list-clients-fiz.component";
import { ShowClientFizComponent } from "../../components/clients-fiz/show-client-fiz/show-client-fiz.component";
import { ListDogovorsClientsFizComponent } from "../../components/clients-fiz/list-dogovors-clients-fiz/list-dogovors-clients-fiz.component";
import { AddDogovorClientFizComponent } from "../../components/clients-fiz/add-dogovor-client-fiz/add-dogovor-client-fiz.component";
import { ShowDogovorClientFizComponent } from "../../components/clients-fiz/show-dogovor-client-fiz/show-dogovor-client-fiz.component";
import { ListActsClientFizComponent } from "../../components/clients-fiz/list-acts-client-fiz/list-acts-client-fiz.component";







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
                {
                    path: 'show-client-fiz/:id', 
                    component: ShowClientFizComponent,
                },
                {
                    path: 'list-dogovors-clients-fiz/:id',
                    component: ListDogovorsClientsFizComponent,
                },
                {
                    path: 'add-dogovor-client-fiz/:id',
                    component: AddDogovorClientFizComponent,
                },
                {
                    path: 'show-dogovor-client-fiz/:id',
                    component: ShowDogovorClientFizComponent,
                },
                {
                    path: 'list-acts-client-fiz/:id',
                    component: ListActsClientFizComponent,
                },
                
            ],
        },

    ];
}

