import {createReducer, on, Action} from '@ngrx/store'
import { ClientLawStateInterface } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { addClientLawAction, addClientLawFailureAction, addClientLawSuccessAction, clientLawDeleteAction, clientLawDeleteFailureAction, clientLawDeleteSuccessAction, clientLawDogovorDeleteAction, clientLawDogovorDeleteFailureAction, clientLawDogovorDeleteSuccessAction, clientLawDogovorsListAction, clientLawDogovorsListFailureAction, clientLawDogovorsListResetAction, clientLawDogovorsListSuccessAction, clientLawGetCurrent, clientLawGetCurrentFailureAction, clientLawGetCurrentReset, clientLawGetCurrentSuccessAction, clientsLawListAction, clientsLawListFailureAction, clientsLawListResetAction, clientsLawListSuccessAction, clientsLawSearchAction, clientsLawSearchFailureAction, clientsLawSearchResetAction, clientsLawSearchSuccessAction, noMoreClientLawDogovorsListAction, noMoreClientLawDogovorsListFalseAction, noMoreClientLawDogovorsListTrueAction, noMoreClientsLawListAction, noMoreClientsLawListFalseAction, noMoreClientsLawListTrueAction, updateStateClientsLawFailureAction, updateStateClientsLawSuccessAction } from '../../actions/actionsClientsLaw/clientsLaw.action';








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
      noMoreClientsLawList: action.data.clientsLaw.noMoreClientsLawList,
      noMoreClientsLawDogovorsList: action.data.clientsLaw.noMoreClientsLawDogovorsList,
      currentClientLaw: action.data.clientsLaw.currentClientLaw,
      dogovorsList: action.data.clientsLaw.dogovorsList,
      currentDogovorClientLaw: action.data.clientsLaw.currentDogovorClientLaw,
      searchList: action.data.clientsLaw.searchList
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






  on(
    clientsLawSearchAction,
    (state): ClientLawStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
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



);





// Экспортируем Reducer
export function reducerLaw(state: ClientLawStateInterface, action: Action) {
  return clientsLawReducer(state, action)
}
