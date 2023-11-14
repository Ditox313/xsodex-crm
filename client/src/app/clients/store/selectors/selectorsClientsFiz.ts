import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ClientFizStateInterface } from '../../types/clientsFiz/clientsFiz.interfaces';





export const clientsFizFeatureSelector = createFeatureSelector<ClientFizStateInterface>('clientsFiz');



export const isLoadingSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.isLoading
)

// export const partnersListSelector = createSelector(
//     partnersFeatureSelector,
//     (state: PartnersStateInterface) => state.partnersList
// )


// export const noMorePartnersList = createSelector(
//     partnersFeatureSelector,
//     (state: PartnersStateInterface) => state.noMorePartnersList
// )


// export const getCurrentPartnerSelector = createSelector(
//     partnersFeatureSelector,
//     (state: PartnersStateInterface) => state.currentPartner
// )






