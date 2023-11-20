import {createReducer, on, Action} from '@ngrx/store'
import { ClientLawStateInterface } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { addClientLawAction, addClientLawFailureAction, addClientLawSuccessAction } from '../../actions/actionsClientsLaw/clientsLaw.action';








// Инициализируем состояние
const initialState: ClientLawStateInterface = {
  isLoading: false,
  validationErrors: null,
  clientsLawList: null,
  noMoreClientsLawList: true,
  currentClientLaw: null,
  dogovorsList: null,
  noMoreClientsLawDogovorsList: true,
  currentDogovorClientLaw: null,
  searchList: null
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










  // on(
  //   clientsFizListAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientsFizListSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     clientsFizList: state.clientsFizList ? [...state.clientsFizList, ...action.data] : action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   clientsFizListFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   clientsFizListResetAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     clientsFizList: null,
  //   })
  // ),
  // on(
  //   noMoreClientsFizListAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     noMoreClientsFizList: action.data,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreClientsFizListFalseAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     noMoreClientsFizList: false,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreClientsFizListTrueAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     noMoreClientsFizList: true,
  //     isLoading: false,
  //   })
  // ),








  // on(
  //   clientFizDeleteAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientFizDeleteSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentClientFiz: null,
  //     clientsFizList: state.clientsFizList ? state.clientsFizList.filter((item: { _id: string; }) => item._id !== action.data) : state.clientsFizList,
  //   })
  // ),
  // on(
  //   clientFizDeleteFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //     currentClientFiz: null,
  //   })
  // ),








  // on(
  //   updateStateClientsFizSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     isLoading: action.data.partners.isLoading,
  //     validationErrors: action.data.clientsFiz.validationErrors,
  //     clientsFizList: action.data.clientsFiz.clientsFizList ,
  //     noMoreClientsFizList: action.data.clientsFiz.noMoreClientsFizList,
  //     noMoreClientsFizDogovorsList: action.data.clientsFiz.noMoreClientsFizDogovorsList,
  //     currentClientFiz: action.data.clientsFiz.currentClientFiz,
  //     dogovorsList: action.data.clientsFiz.dogovorsList,
  //     currentDogovorClientFiz: action.data.clientsFiz.currentDogovorClientFiz,
  //     searchList: action.data.clientsFiz.searchList
  //   }),
  // ),
  // on(
  //   updateStateClientsFizFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //   })
  // ),







  // on(
  //   clientFizGetCurrent,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientFizGetCurrentSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentClientFiz: action.data
  //   })
  // ),
  // on(
  //   clientFizGetCurrentFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   clientFizGetCurrentReset,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     currentClientFiz: null
  //   })
  // ),








  // on(
  //   clientFizDogovorsListAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientFizDogovorsListSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     dogovorsList: state.dogovorsList ? [...state.dogovorsList, ...action.data] : action.data,
  //   })
  // ),
  // on(
  //   clientFizDogovorsListFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   clientFizDogovorsListResetAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     dogovorsList: null,
  //   })
  // ),
  // on(
  //   noMoreClientFizDogovorsListAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     noMoreClientsFizDogovorsList: action.data,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreClientFizDogovorsListFalseAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     noMoreClientsFizDogovorsList: false,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreClientFizDogovorsListTrueAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     noMoreClientsFizDogovorsList: true,
  //     isLoading: false,
  //   })
  // ),






  // on(
  //   clientFizDogovorDeleteAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientFizDogovorDeleteSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentClientFiz: null,
  //     dogovorsList: state.dogovorsList ? state.dogovorsList.filter((item: { _id: string; }) => item._id !== action.data) : state.dogovorsList,
  //   })
  // ),
  // on(
  //   clientFizDogovorDeleteFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),









  // on(
  //   clientFizDogovorGetCurrent,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientFizDogovorGetCurrentSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentDogovorClientFiz: action.data
  //   })
  // ),
  // on(
  //   clientFizDogovorGetCurrentFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   clientFizDogovorGetCurrentReset,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     currentDogovorClientFiz: null
  //   })
  // ),






  // on(
  //   clientsFizSearchAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   clientsFizSearchSuccessAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     searchList: action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   clientsFizSearchFailureAction,
  //   (state, action): ClientFizStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   clientsFizSearchResetAction,
  //   (state): ClientFizStateInterface => ({
  //     ...state,
  //     searchList: null,
  //   })
  // ),



);





// Экспортируем Reducer
export function reducerLaw(state: ClientLawStateInterface, action: Action) {
  return clientsLawReducer(state, action)
}
