import { Type } from "@angular/core"
import { AccountStateInterface } from "src/app/account/types/account.interfaces";

// Интерфейс для Route
export interface Route {
    path: string
    children: Array<Object>,
    component: Type<any>,
    canActivate?: any
}



// Интерфейс для глобального state
export interface AppStateInterface {
    account: AccountStateInterface;
}