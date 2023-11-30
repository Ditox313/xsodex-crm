
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListBookinhsComponent } from "../components/list-bookinhs/list-bookinhs.component";
import { AddBookingComponent } from "../components/add-booking/add-booking.component";




export function getRoutes(): Route[] {
    return [
        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], 
            children: [
                {
                    path: 'add-booking',
                    component: AddBookingComponent,
                },
                {
                    path: 'list-bookings',
                    component: ListBookinhsComponent,
                },
                // {
                //     path: 'show-partner/:id', 
                //     component: ShowPartnerComponent,
                // },
            ],
        },

    ];
}

