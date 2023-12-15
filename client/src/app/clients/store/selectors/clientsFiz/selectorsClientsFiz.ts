import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ClientFizStateInterface } from '../../../types/clientsFiz/clientsFiz.interfaces';





export const clientsFizFeatureSelector = createFeatureSelector<ClientFizStateInterface>('clientsFiz');



export const isLoadingSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.isLoading
)

export const clientsFizListSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.clientsFizList
)


export const noMoreClientsFizList = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.noMoreClientsFizList
)


export const getCurrentClientFizSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.currentClientFiz
)


export const noMoreClientDogovorsFizList = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.noMoreClientsFizDogovorsList
)


export const clientsFizDogovorsListSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.dogovorsList
)


export const getCurrentDogovorClientFizSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.currentDogovorClientFiz
)



export const clientsFizSearchSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.searchList
)



export const actsListFizSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.actsFizList
)


export const noMoreActsListClientFizActionSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.noMoreActsFizList
)



export const bookingsListFizSelector = createSelector(
    clientsFizFeatureSelector,
    (state: ClientFizStateInterface) => state.bookingsFizList
)



