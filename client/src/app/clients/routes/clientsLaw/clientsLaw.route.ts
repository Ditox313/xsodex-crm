
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../../shared/guards/auth.guard";
import { AddClientFizComponent } from "../../components/clients-fiz/add-client-fiz/add-client-fiz.component";
import { ListClientsFizComponent } from "../../components/clients-fiz/list-clients-fiz/list-clients-fiz.component";
import { ShowClientFizComponent } from "../../components/clients-fiz/show-client-fiz/show-client-fiz.component";
import { ListDogovorsClientsFizComponent } from "../../components/clients-fiz/list-dogovors-clients-fiz/list-dogovors-clients-fiz.component";
import { AddDogovorClientFizComponent } from "../../components/clients-fiz/add-dogovor-client-fiz/add-dogovor-client-fiz.component";
import { ShowDogovorClientFizComponent } from "../../components/clients-fiz/show-dogovor-client-fiz/show-dogovor-client-fiz.component";
import { ListClientsLawComponent } from "../../components/clients-law/list-clients-law/list-clients-law.component";
import { AddClientLawComponent } from "../../components/clients-law/add-client-law/add-client-law.component";
import { ShowClientLawComponent } from "../../components/clients-law/show-client-law/show-client-law.component";
import { ListDogovorsClientsLawComponent } from "../../components/clients-law/list-dogovors-clients-law/list-dogovors-clients-law.component";
import { AddDogovorClientLawComponent } from "../../components/clients-law/add-dogovor-client-law/add-dogovor-client-law.component";






export function getRoutesClientsLaw(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-client-law',
                    component: AddClientLawComponent,
                },
                {
                    path: 'list-clients-law',
                    component: ListClientsLawComponent,
                },
                {
                    path: 'show-client-law/:id', 
                    component: ShowClientLawComponent,
                },
                {
                    path: 'list-dogovors-clients-law/:id',
                    component: ListDogovorsClientsLawComponent,
                },
                {
                    path: 'add-dogovor-client-law/:id',
                    component: AddDogovorClientLawComponent,
                },
                // {
                //     path: 'show-dogovor-client-law/:id',
                //     component: ShowDogovorClientFizComponent,
                // },
            ],
        },

    ];
}

