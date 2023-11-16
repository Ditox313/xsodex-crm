import {createReducer, on, Action} from '@ngrx/store'
import { ClientFizStateInterface } from '../../../types/clientsFiz/clientsFiz.interfaces';
import { addClientFizAction, addClientFizFailureAction, addClientFizSuccessAction, clientFizDeleteAction, clientFizDeleteFailureAction, clientFizDeleteSuccessAction, clientsFizListAction, clientsFizListFailureAction, clientsFizListResetAction, clientsFizListSuccessAction, noMoreClientsFizListAction, noMoreClientsFizListFalseAction, noMoreClientsFizListTrueAction, updateStateClientsFizFailureAction, updateStateClientsFizSuccessAction } from '../../actions/actionsClientsFiz/clientsFiz.action';








// Инициализируем состояние
const initialState: ClientFizStateInterface = {
  isLoading: false,
  validationErrors: null,
  clientsFizList: null,
  noMoreClientsFizList: true,
  currentClientFiz: null
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
      currentClientFiz: action.data.clientsFiz.currentClientFiz
    }),
  ),
  on(
    updateStateClientsFizFailureAction,
    (state, action): ClientFizStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  // on(
  //   partnerGetCurrent,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnerGetCurrentSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentPartner: action.data
  //   })
  // ),
  // on(
  //   partnerGetCurrentFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnerGetCurrentReset,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     currentPartner: null
  //   })
  // ),

);





// Экспортируем Reducer
export function reducerFiz(state: ClientFizStateInterface, action: Action) {
  return clientsFizReducer(state, action)
}
