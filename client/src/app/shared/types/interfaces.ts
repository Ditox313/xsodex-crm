import { Type } from "@angular/core"
import { AccountStateInterface } from "src/app/account/types/account.interfaces";
import { BookingsStateInterface } from "src/app/bookings/types/bookings.interfaces";
import { CarsStateInterface } from "src/app/cars/types/cars.interfaces";
import { ClientFizStateInterface } from "src/app/clients/types/clientsFiz/clientsFiz.interfaces";
import { ClientLawStateInterface } from "src/app/clients/types/clientsLaw/clientsLaw.interfaces";
import { PartnersStateInterface } from "src/app/partners/types/partners.interfaces";
import { MastersPriemStateInterface } from "src/app/personal/types/masters-priem.interfaces";
import { SettingsStateInterface } from "src/app/settings/types/settings.interfaces";
import { SmenaStateInterface } from "src/app/smena/types/smena.interfaces";

// Интерфейс для Route
export interface Route {
    path: string
    children: Array<Object>,
    component: Type<any>,
    canActivate?: any
}



// Интерфейс для глобального state
export interface AppStateInterface {
    account: AccountStateInterface,
    smena: SmenaStateInterface,
    cars: CarsStateInterface,
    partners: PartnersStateInterface,
    clientsFiz: ClientFizStateInterface
    clientsLaw: ClientLawStateInterface
    settings: SettingsStateInterface,
    bookings: BookingsStateInterface,
    mastersPriem: MastersPriemStateInterface,
}


