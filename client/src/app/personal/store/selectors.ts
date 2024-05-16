import { createFeatureSelector, createSelector } from '@ngrx/store'
import { MastersPriemStateInterface } from '../types/masters-priem.interfaces';




export const mastersPriemFeatureSelector = createFeatureSelector<MastersPriemStateInterface>('masters-priem');



export const isLoadingSelector = createSelector(
    mastersPriemFeatureSelector,
    (state: MastersPriemStateInterface) => state.isLoading
)

export const mastersPriemListSelector = createSelector(
    mastersPriemFeatureSelector,
    (state: MastersPriemStateInterface) => state.mastersPriemList
)


export const noMoreMastersPriemList = createSelector(
    mastersPriemFeatureSelector,
    (state: MastersPriemStateInterface) => state.noMoreMastersPriemList
)


export const getCurrentMasterPriemSelector = createSelector(
    mastersPriemFeatureSelector,
    (state: MastersPriemStateInterface) => state.currentMasterPriem
)






