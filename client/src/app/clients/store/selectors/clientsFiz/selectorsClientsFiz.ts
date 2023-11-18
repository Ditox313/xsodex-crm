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





