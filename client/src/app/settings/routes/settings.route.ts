
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListSettingsComponent } from "../components/list-settings/list-settings.component";




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
                    path: 'list-settings',
                    component: ListSettingsComponent,
                },
                // {
                //     path: 'show-partner/:id', 
                //     component: ShowPartnerComponent,
                // },
            ],
        },

    ];
}

