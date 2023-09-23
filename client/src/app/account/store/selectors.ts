import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AccountStateInterface } from 'src/app/account/types/account.interfaces'

export const accountFeatureSelector = createFeatureSelector<AccountStateInterface>('account');



// Селектор на получение isSubmitting
export const isLoadingSelector = createSelector(
    accountFeatureSelector,
    (state: AccountStateInterface) => state.isLoading
)






