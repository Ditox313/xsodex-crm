import { createFeatureSelector, createSelector } from '@ngrx/store'
import { PartnersStateInterface } from '../types/partners.interfaces';




export const partnersFeatureSelector = createFeatureSelector<PartnersStateInterface>('partners');



export const isLoadingSelector = createSelector(
    partnersFeatureSelector,
    (state: PartnersStateInterface) => state.isLoading
)

export const partnersListSelector = createSelector(
    partnersFeatureSelector,
    (state: PartnersStateInterface) => state.partnersList
)


export const noMorePartnersList = createSelector(
    partnersFeatureSelector,
    (state: PartnersStateInterface) => state.noMorePartnersList
)


export const getCurrentPartnerSelector = createSelector(
    partnersFeatureSelector,
    (state: PartnersStateInterface) => state.currentPartner
)






