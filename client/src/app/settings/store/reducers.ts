import {createReducer, on, Action} from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings.interfaces';
import {addSettingAvtoparkAction, addSettingAvtoparkFailureAction, addSettingAvtoparkSuccessAction, addSettingGlobalAction, addSettingGlobalFailureAction, addSettingGlobalSuccessAction, addSettingSkladFailureAction, addSettingSkladkAction, addSettingSkladSuccessAction, noMoreSettingsAvtoparkListAction, noMoreSettingsAvtoparkListFalseAction, noMoreSettingsAvtoparkListTrueAction, noMoreSettingsGlobalListAction, noMoreSettingsGlobalListFalseAction, noMoreSettingsGlobalListTrueAction, noMoreSettingsSkladListAction, noMoreSettingsSkladListFalseAction, noMoreSettingsSkladListTrueAction, settingAvtoparkDeleteAction, settingAvtoparkDeleteFailureAction, settingAvtoparkDeleteSuccessAction, settingGlobalDeleteAction, settingGlobalDeleteFailureAction, settingGlobalDeleteSuccessAction, settingsAvtoparkGetCurrent, settingsAvtoparkGetCurrentFailureAction, settingsAvtoparkGetCurrentReset, settingsAvtoparkGetCurrentSuccessAction, settingsAvtoparkListAction, settingsAvtoparkListFailureAction, settingsAvtoparkListResetAction, settingsAvtoparkListSuccessAction, settingsGlobalGetCurrent, settingsGlobalGetCurrentFailureAction, settingsGlobalGetCurrentReset, settingsGlobalGetCurrentSuccessAction, settingsGlobalListAction, settingsGlobalListFailureAction, settingsGlobalListResetAction, settingsGlobalListSuccessAction, settingSkladDeleteAction, settingSkladDeleteFailureAction, settingSkladDeleteSuccessAction, settingsSkladGetCurrent, settingsSkladGetCurrentFailureAction, settingsSkladGetCurrentReset, settingsSkladGetCurrentSuccessAction, settingsSkladListAction, settingsSkladListFailureAction, settingsSkladListResetAction, settingsSkladListSuccessAction, updateStateSettingsFailureAction, updateStateSettingsSuccessAction } from './actions/settings.action';






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
  settingsGlobalList: null,
  noMoreSettingsGlobalList: true,
  currentSettingGlobal: null,
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
    addSettingGlobalAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addSettingGlobalSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addSettingGlobalFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),


// ==============







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
    settingsGlobalListAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingsGlobalListSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      settingsGlobalList: state.settingsGlobalList ? [...state.settingsGlobalList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    settingsGlobalListFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    settingsGlobalListResetAction,
    (state): SettingsStateInterface => ({
      ...state,
      settingsGlobalList: null,
    })
  ),
  on(
    noMoreSettingsGlobalListAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsGlobalList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreSettingsGlobalListFalseAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsGlobalList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreSettingsGlobalListTrueAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      noMoreSettingsGlobalList: true,
      isLoading: false,
    })
  ),







  // =================











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
    settingSkladDeleteAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingSkladDeleteSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSettingSklad: null,
      settingsSkladList: state.settingsSkladList ? state.settingsSkladList.filter((item: { _id: string; }) => item._id !== action.data) : state.settingsSkladList,
    })
  ),
  on(
    settingSkladDeleteFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentSettingSklad: null,
    })
  ),





  on(
    settingGlobalDeleteAction,
    (state): SettingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    settingGlobalDeleteSuccessAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSettingSklad: null,
      settingsGlobalList: state.settingsGlobalList ? state.settingsGlobalList.filter((item: { _id: string; }) => item._id !== action.data) : state.settingsGlobalList,
    })
  ),
  on(
    settingGlobalDeleteFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentSettingGlobal: null,
    })
  ),







  // ================







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
      currentSettingSklad: action.data.settings.currentSettingSklad,
      settingsGlobalList: action.data.settings.settingsGlobalList ,
      noMoreSettingsGlobalList: action.data.settings.noMoreSettingsGlobalList,
      currentSettingGlobal: action.data.settings.currentSettingGlobal
    }),
  ),
  on(
    updateStateSettingsFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),





  // ===========




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





on(
  settingsGlobalGetCurrent,
  (state): SettingsStateInterface => ({
    ...state,
    validationErrors: null,
    isLoading: true
  })
),

on(
  settingsGlobalGetCurrentSuccessAction,
  (state, action): SettingsStateInterface => ({
    ...state,
    isLoading: false,
    validationErrors: null,
    currentSettingGlobal: action.data
  })
),
on(
  settingsGlobalGetCurrentFailureAction,
  (state, action): SettingsStateInterface => ({
    ...state,
    validationErrors: action.errors,
    isLoading: false,
  })
),
on(
  settingsGlobalGetCurrentReset,
  (state): SettingsStateInterface => ({
    ...state,
    currentSettingGlobal: null
  })
),





);














// Экспортируем Reducer
export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action)
}
