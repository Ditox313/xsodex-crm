import {createReducer, on, Action} from '@ngrx/store'
import { MastersPriemStateInterface } from '../types/masters-priem.interfaces';
import { addMasterPriemAction, addMasterPriemFailureAction, addMasterPriemSuccessAction, masterPriemDeleteAction, masterPriemDeleteFailureAction, masterPriemDeleteSuccessAction, mastersPriemListAction, mastersPriemListFailureAction, mastersPriemListResetAction, mastersPriemListSuccessAction, noMoreMastersPriemListAction, noMoreMastersPriemListFalseAction, noMoreMastersPriemListTrueAction, updateStateMastersPriemAction, updateStateMastersPriemFailureAction, updateStateMastersPriemSuccessAction } from './actions/masters-priem.action';







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










  on(
    mastersPriemListAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    mastersPriemListSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      mastersPriemList: state.mastersPriemList ? [...state.mastersPriemList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    mastersPriemListFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    mastersPriemListResetAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      mastersPriemList: null,
    })
  ),
  on(
    noMoreMastersPriemListAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      noMoreMastersPriemList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreMastersPriemListFalseAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      noMoreMastersPriemList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreMastersPriemListTrueAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      noMoreMastersPriemList: true,
      isLoading: false,
    })
  ),








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








  on(
    masterPriemDeleteAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    masterPriemDeleteSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentMasterPriem: null,
      mastersPriemList: state.mastersPriemList ? state.mastersPriemList.filter((item: { _id: string; }) => item._id !== action.data) : state.mastersPriemList,
    })
  ),
  on(
    masterPriemDeleteFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentMasterPriem: null,
    })
  ),








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
