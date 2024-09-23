import {createReducer, on, Action} from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings.interfaces';
import {addSettingAvtoparkAction, addSettingAvtoparkFailureAction, addSettingAvtoparkSuccessAction, addSettingSkladFailureAction, addSettingSkladkAction, addSettingSkladSuccessAction, noMoreSettingsAvtoparkListAction, noMoreSettingsAvtoparkListFalseAction, noMoreSettingsAvtoparkListTrueAction, noMoreSettingsSkladListAction, noMoreSettingsSkladListFalseAction, noMoreSettingsSkladListTrueAction, settingAvtoparkDeleteAction, settingAvtoparkDeleteFailureAction, settingAvtoparkDeleteSuccessAction, settingsAvtoparkGetCurrent, settingsAvtoparkGetCurrentFailureAction, settingsAvtoparkGetCurrentReset, settingsAvtoparkGetCurrentSuccessAction, settingsAvtoparkListAction, settingsAvtoparkListFailureAction, settingsAvtoparkListResetAction, settingsAvtoparkListSuccessAction, settingsSkladGetCurrent, settingsSkladGetCurrentFailureAction, settingsSkladGetCurrentReset, settingsSkladGetCurrentSuccessAction, settingsSkladListAction, settingsSkladListFailureAction, settingsSkladListResetAction, settingsSkladListSuccessAction, updateStateSettingsFailureAction, updateStateSettingsSuccessAction } from './actions/settings.action';






// Инициализируем состояние
const initialState: SettingsStateInterface = {
  isLoading: false,
  validationErrors: null,
  settingsAvtoparkList: null,
  noMoreSettingsAvtoparkList: true,
  currentSettingAvtopark: null,
  settingsSkladList: null,
  noMoreSettingsSkladList: true,
  currentSettingSklad: null,
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
    addSettingSkladkAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addSettingSkladSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addSettingSkladFailureAction,
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
















  on(
    settingsSkladListAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingsSkladListSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      settingsSkladList: state.settingsSkladList ? [...state.settingsSkladList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    settingsSkladListFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    settingsSkladListResetAction,
    (state): SettingsStateInterface => ({
      ...state,
      settingsSkladList: null,
    })
  ),
  on(
    noMoreSettingsSkladListAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsSkladList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreSettingsSkladListFalseAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsSkladList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreSettingsSkladListTrueAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsSkladList: true,
      isLoading: false,
    })
  ),















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
      currentSettingAvtopark: action.data.settings.currentSettingAvtopark,
      settingsSkladList: action.data.settings.settingsSkladList ,
      noMoreSettingsSkladList: action.data.settings.noMoreSettingsSkladList,
      currentSettingSklad: action.data.settings.currentSettingSklad
    }),
  ),
  on(
    updateStateSettingsFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  on(
    settingsAvtoparkGetCurrent,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingsAvtoparkGetCurrentSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSettingAvtopark: action.data
    })
  ),
  on(
    settingsAvtoparkGetCurrentFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    settingsAvtoparkGetCurrentReset,
    (state): SettingsStateInterface => ({
      ...state,
      currentSettingAvtopark: null
    })
  ),









  on(
    settingsSkladGetCurrent,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingsSkladGetCurrentSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSettingSklad: action.data
    })
  ),
  on(
    settingsSkladGetCurrentFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    settingsSkladGetCurrentReset,
    (state): SettingsStateInterface => ({
      ...state,
      currentSettingSklad: null
    })
  ),

);





// Экспортируем Reducer
export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action)
}
