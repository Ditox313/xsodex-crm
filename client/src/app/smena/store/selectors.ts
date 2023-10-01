import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AccountStateInterface } from 'src/app/account/types/account.interfaces'
import { SmenaStateInterface } from '../types/smena.interfaces';

export const smenaFeatureSelector = createFeatureSelector<SmenaStateInterface>('smena');




export const isLoadingSelector = createSelector(
    smenaFeatureSelector,
    (state: SmenaStateInterface) => state.isLoading
)






