import { Type } from "@angular/core"

// Интерфейс для Route
export interface Route {
    path: string
    children: Array<Object>,
    component: Type<any>,
    canActivate?: any
}
