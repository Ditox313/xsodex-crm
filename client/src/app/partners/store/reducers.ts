import {createReducer, on, Action} from '@ngrx/store'
import { PartnersStateInterface } from '../types/partners.interfaces';
import { addPartnerAction, addPartnerFailureAction, addPartnerSuccessAction, noMorePartnersListAction, noMorePartnersListFalseAction, noMorePartnersListTrueAction, partnerDeleteAction, partnerDeleteFailureAction, partnerDeleteSuccessAction, partnerGetCurrent, partnerGetCurrentFailureAction, partnerGetCurrentReset, partnerGetCurrentSuccessAction, partnersListAction, partnersListFailureAction, partnersListResetAction, partnersListSuccessAction, updateStatePartnersFailureAction, updateStatePartnersSuccessAction } from './actions/partners.action';





// Инициализируем состояние
const initialState: PartnersStateInterface = {
  isLoading: false,
  validationErrors: null,
  partnersList: null,
  noMorePartnersList: true,
  currentPartner: null
};




// Создаем редьюсер
const partnersReducer = createReducer(
  initialState,
  on(
    addPartnerAction,
    (state): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addPartnerSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addPartnerFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










  on(
    partnersListAction,
    (state): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    partnersListSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      partnersList: state.partnersList ? [...state.partnersList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    partnersListFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    partnersListResetAction,
    (state): PartnersStateInterface => ({
      ...state,
      partnersList: null,
    })
  ),
  on(
    noMorePartnersListAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      noMorePartnersList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMorePartnersListFalseAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      noMorePartnersList: false,
      isLoading: false,
    })
  ),
  on(
    noMorePartnersListTrueAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      noMorePartnersList: true,
      isLoading: false,
    })
  ),








  on(
    partnerDeleteAction,
    (state): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    partnerDeleteSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentPartner: null,
      partnersList: state.partnersList ? state.partnersList.filter((item: { _id: string; }) => item._id !== action.data) : state.partnersList,
    })
  ),
  on(
    partnerDeleteFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentPartner: null,
    })
  ),








  on(
    updateStatePartnersSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      isLoading: action.data.partners.isLoading,
      validationErrors: action.data.partners.validationErrors,
      partnersList: action.data.partners.partnersList ,
      noMorePartnersList: action.data.partners.noMorePartnersList,
      currentPartner: action.data.partners.currentPartner
    }),
  ),
  on(
    updateStatePartnersFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  on(
    partnerGetCurrent,
    (state): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    partnerGetCurrentSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentPartner: action.data
    })
  ),
  on(
    partnerGetCurrentFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    partnerGetCurrentReset,
    (state): PartnersStateInterface => ({
      ...state,
      currentPartner: null
    })
  ),

);





// Экспортируем Reducer
export function reducers(state: PartnersStateInterface, action: Action) {
  return partnersReducer(state, action)
}
