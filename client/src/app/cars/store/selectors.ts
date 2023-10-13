import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CarsStateInterface } from '../types/cars.interfaces';




export const carsFeatureSelector = createFeatureSelector<CarsStateInterface>('cars');



export const isLoadingSelector = createSelector(
    carsFeatureSelector,
    (state: CarsStateInterface) => state.isLoading
)

export const carsListSelector = createSelector(
    carsFeatureSelector,
    (state: CarsStateInterface) => state.carsList
)



// export const noMoreSmenaList = createSelector(
//     smenaFeatureSelector,
//     (state: SmenaStateInterface) => state.noMoreSmenaList
// )

// export const getCurrentSmenaSelector = createSelector(
//     smenaFeatureSelector,
//     (state: SmenaStateInterface) => state.currentSmena
// )






