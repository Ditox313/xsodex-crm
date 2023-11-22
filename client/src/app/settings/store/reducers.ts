import {createReducer, on, Action} from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings.interfaces';
import {addSettingAvtoparkAction, addSettingAvtoparkFailureAction, addSettingAvtoparkSuccessAction, updateStateSettingsFailureAction, updateStateSettingsSuccessAction } from './actions/settings.action';






// Инициализируем состояние
const initialState: SettingsStateInterface = {
  isLoading: false,
  validationErrors: null,
  settingsList: null,
  noMoreSettingsList: true,
  currentSetting: null
};




// Создаем редьюсер
const settingsReducer = createReducer(
  initialState,
  on(
    addSettingAvtoparkAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addSettingAvtoparkSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addSettingAvtoparkFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










  // on(
  //   partnersListAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnersListSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     partnersList: state.partnersList ? [...state.partnersList, ...action.data] : action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   partnersListFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnersListResetAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     partnersList: null,
  //   })
  // ),
  // on(
  //   noMorePartnersListAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     noMorePartnersList: action.data,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMorePartnersListFalseAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     noMorePartnersList: false,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMorePartnersListTrueAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     noMorePartnersList: true,
  //     isLoading: false,
  //   })
  // ),








  // on(
  //   partnersListNoParamsAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnersListNoParamsSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     partnersList: action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   partnersListNoParamsFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnersListNoParamsResetAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     partnersList: null,
  //   })
  // ),








  // on(
  //   partnerDeleteAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnerDeleteSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentPartner: null,
  //     partnersList: state.partnersList ? state.partnersList.filter((item: { _id: string; }) => item._id !== action.data) : state.partnersList,
  //   })
  // ),
  // on(
  //   partnerDeleteFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //     currentPartner: null,
  //   })
  // ),








  on(
    updateStateSettingsSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: action.data.settings.isLoading,
      validationErrors: action.data.settings.validationErrors,
      settingsList: action.data.settings.settingsList ,
      noMoreSettingsList: action.data.settings.noMoreSettingsList,
      currentSetting: action.data.settings.currentSetting
    }),
  ),
  on(
    updateStateSettingsFailureAction,
    (state, action): SettingsStateInterface => ({
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
export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action)
}
