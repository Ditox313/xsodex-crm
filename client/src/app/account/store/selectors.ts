import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AccountStateInterface } from 'src/app/account/types/account.interfaces'

export const accountFeatureSelector = createFeatureSelector<AccountStateInterface>('account');




export const isLoadingSelector = createSelector(
    accountFeatureSelector,
    (state: AccountStateInterface) => state.isLoading
)


export const tokenSelector = createSelector(
    accountFeatureSelector,
    (state: AccountStateInterface) => state.token
)

export const currentUserSelector = createSelector(
    accountFeatureSelector,
    (state: AccountStateInterface) => state.currentUser
)





