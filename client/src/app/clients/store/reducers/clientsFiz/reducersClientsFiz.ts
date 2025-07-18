import {createReducer, on, Action} from '@ngrx/store'
import { ClientFizStateInterface } from '../../../types/clientsFiz/clientsFiz.interfaces';
import { actsListForClientFizAction, actsListForClientFizFailureAction, actsListForClientFizResetAction, actsListForClientFizSuccessAction, addClientFizAction, addClientFizFailureAction, addClientFizSuccessAction, bookingsListForClientFizAction, bookingsListForClientFizFailureAction, bookingsListForClientFizResetAction, bookingsListForClientFizSuccessAction, clientFizDeleteAction, clientFizDeleteFailureAction, clientFizDeleteSuccessAction, clientFizDogovorDeleteAction, clientFizDogovorDeleteFailureAction, clientFizDogovorDeleteSuccessAction, clientFizDogovorGetCurrent, clientFizDogovorGetCurrentFailureAction, clientFizDogovorGetCurrentReset, clientFizDogovorGetCurrentSuccessAction, clientFizDogovorsListAction, clientFizDogovorsListFailureAction, clientFizDogovorsListResetAction, clientFizDogovorsListSuccessAction, clientFizGetCurrent, clientFizGetCurrentFailureAction, clientFizGetCurrentReset, clientFizGetCurrentSuccessAction, clientsFizFromResetAction, clientsFizListAction, clientsFizListFailureAction, clientsFizListResetAction, clientsFizListSuccessAction, clientsFizSearchAction, clientsFizSearchFailureAction, clientsFizSearchResetAction, clientsFizSearchSuccessAction, noMoreActsListClientFizAction, noMoreActsListClientFizFalseAction, noMoreActsListClientFizTrueAction, noMoreClientFizDogovorsListAction, noMoreClientFizDogovorsListFalseAction, noMoreClientFizDogovorsListTrueAction, noMoreClientsFizListAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction, updateClientFizAction, updateClientFizFailureAction, updateClientFizSuccessAction, updateStateClientsFizFailureAction, updateStateClientsFizSuccessAction } from '../../actions/actionsClientsFiz/clientsFiz.action';








// Инициализируем состояние
const initialState: ClientFizStateInterface = {
  isLoading: false,
  validationErrors: null,
  clientsFizList: null,
  noMoreClientsFizList: true,
  currentClientFiz: null,
  dogovorsList: null,
  noMoreClientsFizDogovorsList: true,
  currentDogovorClientFiz: null,
  searchList: null,
  actsFizList: null,
  noMoreActsFizList: true,
  bookingsFizList: null,
  from: ''
};




// Создаем редьюсер
const clientsFizReducer = createReducer(
  initialState,
  on(
    addClientFizAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addClientFizSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
      from: action.from,
      clientsFizList: state.clientsFizList ? [ action.clientFiz, ...state.clientsFizList,] : state.clientsFizList,
      currentClientFiz: action.clientFiz
    })
  ),
  on(
    addClientFizFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),

  on(
    clientsFizFromResetAction,
    (state): ClientFizStateInterface => ({
      ...state,
      from: ''
    })
  ),










  on(
    clientsFizListAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientsFizListSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      clientsFizList: state.clientsFizList ? [...state.clientsFizList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    clientsFizListFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientsFizListResetAction,
    (state): ClientFizStateInterface => ({
      ...state,
      clientsFizList: null,
    })
  ),
  on(
    noMoreClientsFizListAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreClientsFizList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreClientsFizListFalseAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreClientsFizList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreClientsFizListTrueAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreClientsFizList: true,
      isLoading: false,
    })
  ),








  on(
    clientFizDeleteAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientFizDeleteSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientFiz: null,
      clientsFizList: state.clientsFizList ? state.clientsFizList.filter((item: { _id: string; }) => item._id !== action.data) : state.clientsFizList,
    })
  ),
  on(
    clientFizDeleteFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentClientFiz: null,
    })
  ),








  on(
    updateStateClientsFizSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: action.data.partners.isLoading,
      validationErrors: action.data.clientsFiz.validationErrors,
      clientsFizList: action.data.clientsFiz.clientsFizList ,
      noMoreClientsFizList: action.data.clientsFiz.noMoreClientsFizList,
      noMoreClientsFizDogovorsList: action.data.clientsFiz.noMoreClientsFizDogovorsList,
      currentClientFiz: action.data.clientsFiz.currentClientFiz,
      dogovorsList: action.data.clientsFiz.dogovorsList,
      currentDogovorClientFiz: action.data.clientsFiz.currentDogovorClientFiz,
      searchList: action.data.clientsFiz.searchList,
      actsFizList: action.data.clientsFiz.actsFizList,
      noMoreActsFizList: action.data.clientsFiz.noMoreActsFizList,
      bookingsFizList: action.data.clientsFiz.bookingsFizList,
      from: action.data.clientsFiz.from
    }),
  ),
  on(
    updateStateClientsFizFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  on(
    clientFizGetCurrent,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientFizGetCurrentSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientFiz: action.data
    })
  ),
  on(
    clientFizGetCurrentFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientFizGetCurrentReset,
    (state): ClientFizStateInterface => ({
      ...state,
      currentClientFiz: null
    })
  ),








  on(
    clientFizDogovorsListAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientFizDogovorsListSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      dogovorsList: state.dogovorsList ? [...state.dogovorsList, ...action.data] : action.data,
    })
  ),
  on(
    clientFizDogovorsListFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientFizDogovorsListResetAction,
    (state): ClientFizStateInterface => ({
      ...state,
      dogovorsList: null,
    })
  ),
  on(
    noMoreClientFizDogovorsListAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreClientsFizDogovorsList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreClientFizDogovorsListFalseAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreClientsFizDogovorsList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreClientFizDogovorsListTrueAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreClientsFizDogovorsList: true,
      isLoading: false,
    })
  ),






  on(
    clientFizDogovorDeleteAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientFizDogovorDeleteSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientFiz: null,
      dogovorsList: state.dogovorsList ? state.dogovorsList.filter((item: { _id: string; }) => item._id !== action.data) : state.dogovorsList,
    })
  ),
  on(
    clientFizDogovorDeleteFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),









  on(
    clientFizDogovorGetCurrent,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientFizDogovorGetCurrentSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentDogovorClientFiz: action.data
    })
  ),
  on(
    clientFizDogovorGetCurrentFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientFizDogovorGetCurrentReset,
    (state): ClientFizStateInterface => ({
      ...state,
      currentDogovorClientFiz: null
    })
  ),






  on(
    clientsFizSearchAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false
    })
  ),

  on(
    clientsFizSearchSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      searchList: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    clientsFizSearchFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientsFizSearchResetAction,
    (state): ClientFizStateInterface => ({
      ...state,
      searchList: null,
    })
  ),









  on(
    actsListForClientFizAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    actsListForClientFizSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      actsFizList: action.data,
    })
  ),
  on(
    actsListForClientFizFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    actsListForClientFizResetAction,
    (state): ClientFizStateInterface => ({
      ...state,
      actsFizList: null,
    })
  ),
  on(
    noMoreActsListClientFizAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreActsFizList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreActsListClientFizFalseAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreActsFizList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreActsListClientFizTrueAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      noMoreActsFizList: true,
      isLoading: false,
    })
  ),









  on(
    bookingsListForClientFizAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    bookingsListForClientFizSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      bookingsFizList: action.data,
    })
  ),
  on(
    bookingsListForClientFizFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    bookingsListForClientFizResetAction,
    (state): ClientFizStateInterface => ({
      ...state,
      bookingsFizList: null,
    })
  ),






  on(
    updateClientFizAction,
    (state): ClientFizStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    updateClientFizSuccessAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentClientFiz: action.data
    })
  ),
  on(
    updateClientFizFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),


);





// Экспортируем Reducer
export function reducerFiz(state: ClientFizStateInterface, action: Action) {
  return clientsFizReducer(state, action)
}
