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



export const getCurrentBookingSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.currentBooking
)



export const paysListSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.paysList
)



export const currentClientForAct = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.currentClientForAct
)




export const getCurrentActSelector = createSelector(
    bookingsFeatureSelector,
    (state: BookingsStateInterface) => state.currentAct
)





