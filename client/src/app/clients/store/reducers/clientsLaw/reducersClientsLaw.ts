import {createReducer, on, Action} from '@ngrx/store'
import { ClientLawStateInterface } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { actsListForClientLawAction, actsListForClientLawFailureAction, actsListForClientLawResetAction, actsListForClientLawSuccessAction, addClientLawAction, addClientLawFailureAction, addClientLawSuccessAction, addTrustedPersoneAction, addTrustedPersoneFailureAction, addTrustedPersoneSuccessAction, bookingsListForClientLawAction, bookingsListForClientLawFailureAction, bookingsListForClientLawResetAction, bookingsListForClientLawSuccessAction, clientLawDeleteAction, clientLawDeleteFailureAction, clientLawDeleteSuccessAction, clientLawDogovorDeleteAction, clientLawDogovorDeleteFailureAction, clientLawDogovorDeleteSuccessAction, clientLawDogovorGetCurrent, clientLawDogovorGetCurrentFailureAction, clientLawDogovorGetCurrentReset, clientLawDogovorGetCurrentSuccessAction, clientLawDogovorsListAction, clientLawDogovorsListFailureAction, clientLawDogovorsListResetAction, clientLawDogovorsListSuccessAction, clientLawGetCurrent, clientLawGetCurrentFailureAction, clientLawGetCurrentReset, clientLawGetCurrentSuccessAction, clientsLawListAction, clientsLawListFailureAction, clientsLawListResetAction, clientsLawListSuccessAction, clientsLawSearchAction, clientsLawSearchFailureAction, clientsLawSearchResetAction, clientsLawSearchSuccessAction, noMoreActsListClientLawAction, noMoreActsListClientLawFalseAction, noMoreActsListClientLawTrueAction, noMoreClientLawDogovorsListAction, noMoreClientLawDogovorsListFalseAction, noMoreClientLawDogovorsListTrueAction, noMoreClientsLawListAction, noMoreClientsLawListFalseAction, noMoreClientsLawListTrueAction, noMoreTrustedPersoneListAction, noMoreTrustedPersoneListFalseAction, noMoreTrustedPersoneListTrueAction, trustedPersoneDeleteAction, trustedPersoneDeleteFailureAction, trustedPersoneDeleteSuccessAction, trustedPersoneGetCurrent, trustedPersoneGetCurrentFailureAction, trustedPersoneGetCurrentReset, trustedPersoneGetCurrentSuccessAction, trustedPersoneListAction, trustedPersoneListFailureAction, TrustedPersoneListResetAction, trustedPersoneListSuccessAction, trustedPersoneSearchAction, trustedPersoneSearchFailureAction, trustedPersoneSearchResetAction, trustedPersoneSearchSuccessAction, updateClientLawAction, updateClientLawFailureAction, updateClientLawSuccessAction, updateStateClientsLawFailureAction, updateStateClientsLawSuccessAction, updateTrustedPersoneAction, updateTrustedPersoneFailureAction, updateTrustedPersoneSuccessAction } from '../../actions/actionsClientsLaw/clientsLaw.action';








// Инициализируем состояние
const initialState: ClientLawStateInterface = {
  isLoading: false,
  validationErrors: null,
  clientsLawList: null,
  trustedPersoneList: null,
  noMoreClientsLawList: true,
  noMoreTrustedPersoneList: true,
  currentClientLaw: null,
  currentTrustedPersone: null,
  dogovorsList: null,
  noMoreClientsLawDogovorsList: true,
  currentDogovorClientLaw: null,
  searchList: null,
  searchListTrustedPersone: null,
  actsLawList: null,
  noMoreActsLawList: true,
  bookingsLawList: null,
  from: ''
};




// Создаем редьюсер
const clientsLawReducer = createReducer(
  initialState,





  on(
    addClientLawAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addClientLawSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
      from: action.from,
      clientsLawList: state.clientsLawList ? [ action.clientLaw, ...state.clientsLawList,] : state.clientsLawList,
      currentClientLaw: action.clientLaw
    })
  ),
  on(
    addClientLawFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










  on(
    clientsLawListAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientsLawListSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      clientsLawList: state.clientsLawList ? [...state.clientsLawList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    clientsLawListFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientsLawListResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      clientsLawList: null,
    })
  ),
  on(
    noMoreClientsLawListAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreClientsLawList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreClientsLawListFalseAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreClientsLawList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreClientsLawListTrueAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreClientsLawList: true,
      isLoading: false,
    })
  ),








  on(
    clientLawDeleteAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientLawDeleteSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientLaw: null,
      clientsLawList: state.clientsLawList ? state.clientsLawList.filter((item: { _id: string; }) => item._id !== action.data) : state.clientsLawList,
    })
  ),
  on(
    clientLawDeleteFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentClientLaw: null,
    })
  ),








  on(
    updateStateClientsLawSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: action.data.partners.isLoading,
      validationErrors: action.data.clientsLaw.validationErrors,
      clientsLawList: action.data.clientsLaw.clientsLawList ,
      trustedPersoneList: action.data.clientsLaw.trustedPersoneList ,
      noMoreClientsLawList: action.data.clientsLaw.noMoreClientsLawList,
      noMoreTrustedPersoneList: action.data.clientsLaw.noMoreTrustedPersoneList,
      noMoreClientsLawDogovorsList: action.data.clientsLaw.noMoreClientsLawDogovorsList,
      currentClientLaw: action.data.clientsLaw.currentClientLaw,
      currentTrustedPersone: action.data.clientsLaw.currentTrustedPersone,
      dogovorsList: action.data.clientsLaw.dogovorsList,
      currentDogovorClientLaw: action.data.clientsLaw.currentDogovorClientLaw,
      searchList: action.data.clientsLaw.searchList,
      searchListTrustedPersone: action.data.clientsLaw.searchListTrustedPersone,
      actsLawList: action.data.clientsLaw.actsLawList,
      noMoreActsLawList: action.data.clientsLaw.noMoreActsLawList,
      bookingsLawList: action.data.clientsLaw.bookingsLawList,
      from: action.data.clientsFiz.from
    }),
  ),
  on(
    updateStateClientsLawFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  on(
    clientLawGetCurrent,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientLawGetCurrentSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientLaw: action.data
    })
  ),
  on(
    clientLawGetCurrentFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientLawGetCurrentReset,
    (state): ClientLawStateInterface => ({
      ...state,
      currentClientLaw: null
    })
  ),








  on(
    clientLawDogovorsListAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientLawDogovorsListSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      dogovorsList: state.dogovorsList ? [...state.dogovorsList, ...action.data] : action.data,
    })
  ),
  on(
    clientLawDogovorsListFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientLawDogovorsListResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      dogovorsList: null,
    })
  ),
  on(
    noMoreClientLawDogovorsListAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreClientsLawDogovorsList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreClientLawDogovorsListFalseAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreClientsLawDogovorsList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreClientLawDogovorsListTrueAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreClientsLawDogovorsList: true,
      isLoading: false,
    })
  ),






  on(
    clientLawDogovorDeleteAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientLawDogovorDeleteSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientLaw: null,
      dogovorsList: state.dogovorsList ? state.dogovorsList.filter((item: { _id: string; }) => item._id !== action.data) : state.dogovorsList,
    })
  ),
  on(
    clientLawDogovorDeleteFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),









  on(
    clientLawDogovorGetCurrent,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientLawDogovorGetCurrentSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentDogovorClientLaw: action.data
    })
  ),
  on(
    clientLawDogovorGetCurrentFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientLawDogovorGetCurrentReset,
    (state): ClientLawStateInterface => ({
      ...state,
      currentDogovorClientLaw: null
    })
  ),






  on(
    clientsLawSearchAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false
    })
  ),

  on(
    clientsLawSearchSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      searchList: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    clientsLawSearchFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientsLawSearchResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      searchList: null,
    })
  ),










  on(
    actsListForClientLawAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    actsListForClientLawSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      actsLawList: action.data,
    })
  ),
  on(
    actsListForClientLawFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    actsListForClientLawResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      actsLawList: null,
    })
  ),
  on(
    noMoreActsListClientLawAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreActsLawList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreActsListClientLawFalseAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreActsLawList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreActsListClientLawTrueAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreActsLawList: true,
      isLoading: false,
    })
  ),











  on(
    bookingsListForClientLawAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    bookingsListForClientLawSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      bookingsLawList: action.data,
    })
  ),
  on(
    bookingsListForClientLawFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    bookingsListForClientLawResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      bookingsLawList: null,
    })
  ),




  on(
    updateClientLawAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    updateClientLawSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientLaw: action.data
    })
  ),
  on(
    updateClientLawFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),












  // Доверенное лицо
  on(
    addTrustedPersoneAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addTrustedPersoneSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
      trustedPersoneList: state.trustedPersoneList ? [ action.trustedPersone, ...state.trustedPersoneList,] : state.trustedPersoneList,
    })
  ),
  on(
    addTrustedPersoneFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),












  // Список доверенных лиц
  on(
    trustedPersoneListAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    trustedPersoneListSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      trustedPersoneList: state.trustedPersoneList ? [...state.trustedPersoneList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    trustedPersoneListFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    TrustedPersoneListResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      trustedPersoneList: null,
    })
  ),
  on(
    noMoreTrustedPersoneListAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreTrustedPersoneList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreTrustedPersoneListFalseAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreTrustedPersoneList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreTrustedPersoneListTrueAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      noMoreTrustedPersoneList: true,
      isLoading: false,
    })
  ),




  // Поиск доверенных лиц
  on(
    trustedPersoneSearchAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false
    })
  ),

  on(
    trustedPersoneSearchSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      searchListTrustedPersone: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    trustedPersoneSearchFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    trustedPersoneSearchResetAction,
    (state): ClientLawStateInterface => ({
      ...state,
      searchListTrustedPersone: null,
    })
  ),





  // Удаление доверенного лица
  on(
    trustedPersoneDeleteAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    trustedPersoneDeleteSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      // currentClientLaw: null,
      trustedPersoneList: state.trustedPersoneList ? state.trustedPersoneList.filter((item: { _id: string; }) => item._id !== action.data) : state.trustedPersoneList,
    })
  ),
  on(
    trustedPersoneDeleteFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      // currentClientLaw: null,
    })
  ),










  // Получаем доверенное лицо
  on(
    trustedPersoneGetCurrent,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    trustedPersoneGetCurrentSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentTrustedPersone: action.data
    })
  ),
  on(
    trustedPersoneGetCurrentFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    trustedPersoneGetCurrentReset,
    (state): ClientLawStateInterface => ({
      ...state,
      currentTrustedPersone: null
    })
  ),





  // Обновление доверенного лица
  on(
    updateTrustedPersoneAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    updateTrustedPersoneSuccessAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentTrustedPersone: action.data
    })
  ),
  on(
    updateTrustedPersoneFailureAction,
    (state, action): ClientLawStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),






);





// Экспортируем Reducer
export function reducerLaw(state: ClientLawStateInterface, action: Action) {
  return clientsLawReducer(state, action)
}
