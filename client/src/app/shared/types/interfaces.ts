import { Type } from "@angular/core"
import { AccountStateInterface } from "src/app/account/types/account.interfaces";
import { CarsStateInterface } from "src/app/cars/types/cars.interfaces";
import { PartnersStateInterface } from "src/app/partners/types/partners.interfaces";
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
    partners: PartnersStateInterface
}




