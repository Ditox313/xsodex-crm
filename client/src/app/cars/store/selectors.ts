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



export const noMoreCarsList = createSelector(
    carsFeatureSelector,
    (state: CarsStateInterface) => state.noMoreCarsList
)


export const getCurrentCarSelector = createSelector(
    carsFeatureSelector,
    (state: CarsStateInterface) => state.currentCar
)






