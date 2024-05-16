import {createReducer, on, Action} from '@ngrx/store'
import { MastersPriemStateInterface } from '../types/masters-priem.interfaces';
import { addMasterPriemAction, addMasterPriemFailureAction, addMasterPriemSuccessAction, masterPriemDeleteAction, masterPriemDeleteFailureAction, masterPriemDeleteSuccessAction, masterPriemGetCurrent, masterPriemGetCurrentFailureAction, masterPriemGetCurrentReset, masterPriemGetCurrentSuccessAction, mastersPriemListAction, mastersPriemListFailureAction, mastersPriemListNoParamsAction, mastersPriemListNoParamsFailureAction, mastersPriemListNoParamsResetAction, mastersPriemListNoParamsSuccessAction, mastersPriemListResetAction, mastersPriemListSuccessAction, noMoreMastersPriemListAction, noMoreMastersPriemListFalseAction, noMoreMastersPriemListTrueAction, updateMasterPriemAction, updateMasterPriemFailureAction, updateMasterPriemSuccessAction, updateStateMastersPriemAction, updateStateMastersPriemFailureAction, updateStateMastersPriemSuccessAction } from './actions/masters-priem.action';







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








  on(
    mastersPriemListNoParamsAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    mastersPriemListNoParamsSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      mastersPriemList: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    mastersPriemListNoParamsFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    mastersPriemListNoParamsResetAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      mastersPriemList: null,
    })
  ),








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







  on(
    masterPriemGetCurrent,
    (state): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    masterPriemGetCurrentSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentMasterPriem: action.data
    })
  ),
  on(
    masterPriemGetCurrentFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    masterPriemGetCurrentReset,
    (state): MastersPriemStateInterface => ({
      ...state,
      currentMasterPriem: null
    })
  ),










  on(
    updateMasterPriemAction,
    (state): MastersPriemStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    updateMasterPriemSuccessAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentMasterPriem: action.data
    })
  ),
  on(
    updateMasterPriemFailureAction,
    (state, action): MastersPriemStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),

);





// Экспортируем Reducer
export function reducers(state: MastersPriemStateInterface, action: Action) {
  return mastersPriemReducer(state, action)
}
