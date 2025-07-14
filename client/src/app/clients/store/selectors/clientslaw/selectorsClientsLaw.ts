import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ClientLawStateInterface } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';





export const clientsLawFeatureSelector = createFeatureSelector<ClientLawStateInterface>('clientsLaw');



export const isLoadingSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.isLoading
)

export const clientsLawListSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.clientsLawList
)


export const noMoreClientsLawList = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.noMoreClientsLawList
)


export const getCurrentClientLawSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.currentClientLaw
)


export const noMoreClientDogovorsLawList = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.noMoreClientsLawDogovorsList
)


export const clientsLawDogovorsListSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.dogovorsList
)


export const getCurrentDogovorClientLawSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.currentDogovorClientLaw
)



export const clientsLawSearchSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.searchList
)



export const actsListLawSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.actsLawList
)


export const noMoreActsListClientLawActionSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.noMoreActsLawList
)




export const bookingsListLawSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.bookingsLawList
)





export const trustedPersonesListSelector = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.trustedPersoneList
)


export const noMoreTrustedPersoneLawList = createSelector(
    clientsLawFeatureSelector,
    (state: ClientLawStateInterface) => state.noMoreTrustedPersoneList
)



