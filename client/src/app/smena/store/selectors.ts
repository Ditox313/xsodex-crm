import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AccountStateInterface } from 'src/app/account/types/account.interfaces'
import { SmenaStateInterface } from '../types/smena.interfaces';

export const smenaFeatureSelector = createFeatureSelector<SmenaStateInterface>('smena');




export const isLoadingSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.isLoading
)

export const smenaListSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.smenaList
)

export const paysListForSmenaSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.paysList
)


export const paysListForGeneralreportSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.paysListForGeneralReport
)

export const isOpenedSmenaSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.isOpenedSmena
)


export const noMoreSmenaList = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.noMoreSmenaList
)

export const getCurrentSmenaSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.currentSmena
)






