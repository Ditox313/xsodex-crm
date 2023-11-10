import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PartnersStateInterface } from '../types/partners.interfaces';




export const partnersFeatureSelector = createFeatureSelector<PartnersStateInterface>('partners');



export const isLoadingSelector = createSelector(
    partnersFeatureSelector,
    (state: PartnersStateInterface) => state.isLoading
)

// export const carsListSelector = createSelector(
//     carsFeatureSelector,
//     (state: CarsStateInterface) => state.carsList
// )



// export const noMoreCarsList = createSelector(
//     carsFeatureSelector,
//     (state: CarsStateInterface) => state.noMoreCarsList
// )


// export const getCurrentCarSelector = createSelector(
//     carsFeatureSelector,
//     (state: CarsStateInterface) => state.currentCar
// )






