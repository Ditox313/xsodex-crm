
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListSettingsComponent } from "../components/list-settings/list-settings.component";
import { AddSettingAvtoparkComponent } from "../components/add-setting-avtopark/add-setting-avtopark.component";
import { ShowSettingsAvtoparkComponent } from "../components/show-settings-avtopark/show-settings-avtopark.component";
import { AddSettingSkladComponent } from "../components/setting-sklad/add-setting-sklad/add-setting-sklad.component";
import { ShowSettingSkladComponent } from "../components/setting-sklad/show-setting-sklad/show-setting-sklad.component";




export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-setting-avtopark',
                    component: AddSettingAvtoparkComponent,
                },
                {
                    path: 'list-settings',
                    component: ListSettingsComponent,
                },
                {
                    path: 'show-settings-avtopark/:id', 
                    component: ShowSettingsAvtoparkComponent,
                },

                {
                    path: 'add-setting-sklad',
                    component: AddSettingSkladComponent,
                },

                {
                    path: 'show-settings-sklad/:id', 
                    component: ShowSettingSkladComponent,
                },
            ],
        },

    ];
}

