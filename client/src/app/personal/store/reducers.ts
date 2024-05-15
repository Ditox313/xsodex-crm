import {createReducer, on, Action} from '@ngrx/store'
import { MastersPriemStateInterface } from '../types/masters-priem.interfaces';
import { addMasterPriemAction, addMasterPriemFailureAction, addMasterPriemSuccessAction, updateStateMastersPriemAction, updateStateMastersPriemFailureAction, updateStateMastersPriemSuccessAction } from './actions/masters-priem.action';







// Инициализируем состояние
const initialState: MastersPriemStateInterface = {
  isLoading: false,
  validationErrors: null,
  mastersPriemList: null,
  noMoreMastersPriemList: true,
  currentMasterPriem: null
};




// Создаем редьюсер
const mastersPriemReducer = createReducer(
  initialState,
  on(
    addMasterPriemAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addMasterPriemSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addMasterPriemFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










  // on(
  //   partnersListAction,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnersListSuccessAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     partnersList: state.partnersList ? [...state.partnersList, ...action.data] : action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   partnersListFailureAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnersListResetAction,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     partnersList: null,
  //   })
  // ),
  // on(
  //   noMorePartnersListAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     noMorePartnersList: action.data,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMorePartnersListFalseAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     noMorePartnersList: false,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMorePartnersListTrueAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     noMorePartnersList: true,
  //     isLoading: false,
  //   })
  // ),








  // on(
  //   partnersListNoParamsAction,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnersListNoParamsSuccessAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     partnersList: action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   partnersListNoParamsFailureAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnersListNoParamsResetAction,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     partnersList: null,
  //   })
  // ),








  // on(
  //   partnerDeleteAction,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnerDeleteSuccessAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentPartner: null,
  //     partnersList: state.partnersList ? state.partnersList.filter((item: { _id: string; }) => item._id !== action.data) : state.partnersList,
  //   })
  // ),
  // on(
  //   partnerDeleteFailureAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //     currentPartner: null,
  //   })
  // ),








  on(
    updateStateMastersPriemSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      isLoading: action.data.partners.isLoading,
      validationErrors: action.data.partners.validationErrors,
      mastersPriemList: action.data.partners.partnersList ,
      noMoreMastersPriemList: action.data.partners.noMorePartnersList,
      currentMasterPriem: action.data.partners.currentPartner
    }),
  ),
  on(
    updateStateMastersPriemFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  // on(
  //   partnerGetCurrent,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnerGetCurrentSuccessAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentPartner: action.data
  //   })
  // ),
  // on(
  //   partnerGetCurrentFailureAction,
  //   (state, action): MastersPriemStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnerGetCurrentReset,
  //   (state): MastersPriemStateInterface => ({
  //     ...state,
  //     currentPartner: null
  //   })
  // ),










//   on(
//     updatePartnerAction,
//     (state): MastersPriemStateInterface => ({
//       ...state,
//       validationErrors: null,
//       isLoading: true
//     })
//   ),

//   on(
//     updatePartnerSuccessAction,
//     (state, action): MastersPriemStateInterface => ({
//       ...state,
//       isLoading: false,
//       validationErrors: null,
//       currentPartner: action.data
//     })
//   ),
//   on(
//     updatePartnerFailureAction,
//     (state, action): MastersPriemStateInterface => ({
//       ...state,
//       validationErrors: action.errors,
//       isLoading: false,
//     })
//   ),

);





// Экспортируем Reducer
export function reducers(state: MastersPriemStateInterface, action: Action) {
  return mastersPriemReducer(state, action)
}
