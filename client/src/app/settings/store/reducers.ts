import {createReducer, on, Action} from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings.interfaces';
import {addSettingAvtoparkAction, addSettingAvtoparkFailureAction, addSettingAvtoparkSuccessAction, noMoreSettingsAvtoparkListAction, noMoreSettingsAvtoparkListFalseAction, noMoreSettingsAvtoparkListTrueAction, settingAvtoparkDeleteAction, settingAvtoparkDeleteFailureAction, settingAvtoparkDeleteSuccessAction, settingsAvtoparkListAction, settingsAvtoparkListFailureAction, settingsAvtoparkListResetAction, settingsAvtoparkListSuccessAction, updateStateSettingsFailureAction, updateStateSettingsSuccessAction } from './actions/settings.action';






// Инициализируем состояние
const initialState: SettingsStateInterface = {
  isLoading: false,
  validationErrors: null,
  settingsAvtoparkList: null,
  noMoreSettingsAvtoparkList: true,
  currentSettingAvtopark: null
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










  on(
    settingsAvtoparkListAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingsAvtoparkListSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      settingsAvtoparkList: state.settingsAvtoparkList ? [...state.settingsAvtoparkList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    settingsAvtoparkListFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    settingsAvtoparkListResetAction,
    (state): SettingsStateInterface => ({
      ...state,
      settingsAvtoparkList: null,
    })
  ),
  on(
    noMoreSettingsAvtoparkListAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsAvtoparkList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreSettingsAvtoparkListFalseAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsAvtoparkList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreSettingsAvtoparkListTrueAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsAvtoparkList: true,
      isLoading: false,
    })
  ),








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








  on(
    settingAvtoparkDeleteAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingAvtoparkDeleteSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSettingAvtopark: null,
      settingsAvtoparkList: state.settingsAvtoparkList ? state.settingsAvtoparkList.filter((item: { _id: string; }) => item._id !== action.data) : state.settingsAvtoparkList,
    })
  ),
  on(
    settingAvtoparkDeleteFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentSettingAvtopark: null,
    })
  ),








  on(
    updateStateSettingsSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: action.data.settings.isLoading,
      validationErrors: action.data.settings.validationErrors,
      settingsAvtoparkList: action.data.settings.settingsAvtoparkList ,
      noMoreSettingsAvtoparkList: action.data.settings.noMoreSettingsAvtoparkList,
      currentSettingAvtopark: action.data.settings.currentSettingAvtopark
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
