
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { AddCarComponent } from "../components/add-car/add-car.component";
import { ListCarsComponent } from "../components/list-cars/list-cars.component";


export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-car',
                    component: AddCarComponent,
                },
                {
                    path: 'list-cars',
                    component: ListCarsComponent,
                },
                // {
                //     path: 'show-smena/:id', 
                //     component: ShowSmenaComponent,
                // },
            ],
        },

    ];
}

