import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BookingsStateInterface } from '../types/bookings.interfaces';




export const bookingsFeatureSelector = createFeatureSelector<BookingsStateInterface>('bookings');



export const isLoadingSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.isLoading
)

export const bookingsListSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.bookingsList
)

export const clientsForSearchListSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.clients
)


export const noMoreBookingsList = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.noMoreBookingsList
)


export const noMoreClientsList = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.noMoreClientsList
)



export const clientsSearchSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.searchList
)



export const currentClient = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.currentClient
)



// export const getCurrentPartnerSelector = createSelector(
//     partnersFeatureSelector,
//     (state: PartnersStateInterface) => state.currentPartner
// )






