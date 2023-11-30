import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BookingsStateInterface } from '../types/bookings.interfaces';




export const bookingsFeatureSelector = createFeatureSelector<BookingsStateInterface>('bookings');



export const isLoadingSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.isLoading
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






