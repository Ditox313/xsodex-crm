
import { Route } from "src/app/shared/types/interfaces";
import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { ListBookingsComponent } from "../components/list-bookings/list-bookings.component";
import { AddBookingComponent } from "../components/add-booking/add-booking.component";
import { ShowBookingComponent } from "../components/show-booking/show-booking.component";
import { AddActBookingComponent } from "../components/add-act-booking/add-act-booking.component";
import { ShowActBookingComponent } from "../components/show-act-booking/show-act-booking.component";
import { ExtendBookingComponent } from "../components/extend-booking/extend-booking.component";
import { CloseBookingComponent } from "../components/close-booking/close-booking.component";
import { EditBookingComponent } from "../components/edit-booking/edit-booking.component";




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
                    component: ListBookingsComponent,
                },
                {
                    path: 'show-booking/:id', 
                    component: ShowBookingComponent,
                },
                {
                    path: 'add-act-booking/:id',
                    component: AddActBookingComponent,
                },
                {
                    path: 'show-act-booking/:id',
                    component: ShowActBookingComponent,
                },
                {
                    path: 'extend-booking/:id',
                    component: ExtendBookingComponent,
                },
                {
                    path: 'close-booking/:id',
                    component: CloseBookingComponent,
                },
                {
                    path: 'edit-booking/:id',
                    component: EditBookingComponent,
                },
            ],
        },

    ];
}

