
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListMastersPriemComponent } from "../components/masters-priem/list-masters-priem/list-masters-priem.component";
import { AddMasterPriemComponent } from "../components/masters-priem/add-master-priem/add-master-priem.component";

// import { AddPartnerComponent } from "../components/add-partner/add-partner.component";
// import { ShowPartnerComponent } from "../components/show-partner/show-partner.component";



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
                // {
                //     path: 'show-partner/:id', 
                //     component: ShowPartnerComponent,
                // },
            ],
        },

    ];
}

