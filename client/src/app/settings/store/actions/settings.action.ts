import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../actionTypes';
import { SettingAvtopark, SettingSklad, SettingsParamsFetch, SettingGlobal } from '../../types/settings.interfaces';


// Add setting avtopark
export const addSettingAvtoparkAction = createAction(
  ActionTypes.ADD_SETTING_AVTOPARK,
  props<{ setting: SettingAvtopark}>()
);

export const addSettingAvtoparkSuccessAction = createAction(
  ActionTypes.ADD_SETTING_AVTOPARK_SUCCESS,
);


export const addSettingAvtoparkFailureAction = createAction(
  ActionTypes.ADD_SETTING_AVTOPARK_FAILURE,
  props<{ errors: any }>()
);




// Settings avtopark List
export const settingsAvtoparkListAction = createAction(
  ActionTypes.SETTINGS_AVTOPARK_LIST,
  props<{ params?: SettingsParamsFetch  | {}}>()
);


export const settingsAvtoparkListSuccessAction = createAction(
  ActionTypes.SETTINGS_AVTOPARK_LIST_SUCCES,
  props<{ data: SettingAvtopark[] }>()
);


export const settingsAvtoparkListFailureAction = createAction(
  ActionTypes.SETTINGS_AVTOPARK_LIST_FAILURE,
  props<{ errors: any }>()
);


export const settingsAvtoparkListResetAction = createAction(
  ActionTypes.SETTINGS_AVTOPARK_LIST_RESET,
);









// Get SettingsAvtopark Current
export const settingsAvtoparkGetCurrent = createAction(
  ActionTypes.SETTINGS_AVTOPARK_GET_CURRENT,
  props<{ id: string }>()
);


export const settingsAvtoparkGetCurrentSuccessAction = createAction(
  ActionTypes.SETTINGS_AVTOPARK_GET_CURRENT_SUCCES,
  props<{ data: SettingAvtopark }>()
);


export const settingsAvtoparkGetCurrentFailureAction = createAction(
  ActionTypes.SETTINGS_AVTOPARK_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const settingsAvtoparkGetCurrentReset = createAction(
  ActionTypes.SETTINGS_AVTOPARK_GET_CURRENT_RESET,
);








// Setting avtopark delete
export const settingAvtoparkDeleteAction = createAction(
  ActionTypes.SETTING_AVTOPARK_DELETE,
  props<{ id: string | undefined }>()
);


export const settingAvtoparkDeleteSuccessAction = createAction(
  ActionTypes.SETTING_AVTOPARK_DELETE_SUCCES,
  props<{ data: string }>()
);


export const settingAvtoparkDeleteFailureAction = createAction(
  ActionTypes.SETTING_AVTOPARK_DELETE_FAILURE,
  props<{ errors: any }>()
);














// No more Settings avtopark List

export const noMoreSettingsAvtoparkListAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_AVTOPARK_LIST,
  props<{ data: boolean }>()
);

export const noMoreSettingsAvtoparkListFalseAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_AVTOPARK_LIST_FALSE,
);

export const noMoreSettingsAvtoparkListTrueAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_AVTOPARK_LIST_TRUE,
);











// Update Setting avtopark
export const updateSettingsAvtoparkAction = createAction(
  ActionTypes.UPDATE_SETTINS_AVTOPARK,
  props<{ settingAvtopark: SettingAvtopark}>()
)


export const updateSettingsAvtoparkSuccessAction = createAction(
  ActionTypes.UPDATE_SETTINS_AVTOPARK_SUCCESS,
  props<{ data: SettingAvtopark }>()
);




export const updateSettingsAvtoparkFailureAction = createAction(
  ActionTypes.UPDATE_SSETTINS_AVTOPARK_FAILURE,
  props<{ errors: any }>()
)





























// Add setting sklad
export const addSettingSkladkAction = createAction(
  ActionTypes.ADD_SETTING_SKLAD,
  props<{ setting: SettingSklad}>()
);

export const addSettingSkladSuccessAction = createAction(
  ActionTypes.ADD_SETTING_SKLAD_SUCCESS,
);


export const addSettingSkladFailureAction = createAction(
  ActionTypes.ADD_SETTING_SKLAD_FAILURE,
  props<{ errors: any }>()
);







// Settings sklad List
export const settingsSkladListAction = createAction(
  ActionTypes.SETTINGS_SKLAD_LIST,
  props<{ params?: SettingsParamsFetch  | {}}>()
);


export const settingsSkladListSuccessAction = createAction(
  ActionTypes.SETTINGS_SKLAD_LIST_SUCCES,
  props<{ data: SettingSklad[] }>()
);


export const settingsSkladListFailureAction = createAction(
  ActionTypes.SETTINGS_SKLAD_LIST_FAILURE,
  props<{ errors: any }>()
);


export const settingsSkladListResetAction = createAction(
  ActionTypes.SETTINGS_SKLAD_LIST_RESET,
);





// No more Settings sklad List

export const noMoreSettingsSkladListAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_SKLAD_LIST,
  props<{ data: boolean }>()
);

export const noMoreSettingsSkladListFalseAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_SKLAD_LIST_FALSE,
);

export const noMoreSettingsSkladListTrueAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_SKLAD_LIST_TRUE,
);









// Setting sklad delete
export const settingSkladDeleteAction = createAction(
  ActionTypes.SETTING_SKLAD_DELETE,
  props<{ id: string | undefined }>()
);


export const settingSkladDeleteSuccessAction = createAction(
  ActionTypes.SETTING_SKLAD_DELETE_SUCCES,
  props<{ data: string }>()
);


export const settingSkladDeleteFailureAction = createAction(
  ActionTypes.SETTING_SKLAD_DELETE_FAILURE,
  props<{ errors: any }>()
);








// Update State Settings
export const updateStateSettingsAction = createAction(
  ActionTypes.UPDATE_STATE_SETTINGS,
);


export const updateStateSettingsSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_SETTINGS_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStateSettingsFailureAction = createAction(
  ActionTypes.UPDATE_STATE_SETTINGS_FAILURE,
  props<{ errors: any }>()
);











// Get SettingsSklad Current
export const settingsSkladGetCurrent = createAction(
  ActionTypes.SETTINGS_SKLAD_GET_CURRENT,
  props<{ id: string }>()
);


export const settingsSkladGetCurrentSuccessAction = createAction(
  ActionTypes.SETTINGS_SKLAD_GET_CURRENT_SUCCES,
  props<{ data: SettingSklad }>()
);


export const settingsSkladGetCurrentFailureAction = createAction(
  ActionTypes.SETTINGS_SKLAD_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const settingsSkladGetCurrentReset = createAction(
  ActionTypes.SETTINGS_SKLAD_GET_CURRENT_RESET,
);









// Update Setting sklad
export const updateSettingsSkladAction = createAction(
  ActionTypes.UPDATE_SETTINS_SKLAD,
  props<{ settingSklad: SettingSklad}>()
)


export const updateSettingsSkladSuccessAction = createAction(
  ActionTypes.UPDATE_SETTINS_SKLAD_SUCCESS,
  props<{ data: SettingSklad }>()
);




export const updateSettingsSkladFailureAction = createAction(
  ActionTypes.UPDATE_SSETTINS_SKLAD_FAILURE,
  props<{ errors: any }>()
)








// ================









// Add setting global
export const addSettingGlobalAction = createAction(
  ActionTypes.ADD_SETTING_GLOBAL,
  props<{ setting: SettingGlobal}>()
);

export const addSettingGlobalSuccessAction = createAction(
  ActionTypes.ADD_SETTING_GLOBAL_SUCCESS,
);


export const addSettingGlobalFailureAction = createAction(
  ActionTypes.ADD_SETTING_GLOBAL_FAILURE,
  props<{ errors: any }>()
);




// Settings global List
export const settingsGlobalListAction = createAction(
  ActionTypes.SETTINGS_GLOBAL_LIST,
  props<{ params?: SettingsParamsFetch  | {}}>()
);


export const settingsGlobalListSuccessAction = createAction(
  ActionTypes.SETTINGS_GLOBAL_LIST_SUCCES,
  props<{ data: SettingGlobal[] }>()
);


export const settingsGlobalListFailureAction = createAction(
  ActionTypes.SETTINGS_GLOBAL_LIST_FAILURE,
  props<{ errors: any }>()
);


export const settingsGlobalListResetAction = createAction(
  ActionTypes.SETTINGS_GLOBAL_LIST_RESET,
);









// Get SettingsGlobalCurrent
export const settingsGlobalGetCurrent = createAction(
  ActionTypes.SETTINGS_GLOBAL_GET_CURRENT,
  props<{ id: string }>()
);


export const settingsGlobalGetCurrentSuccessAction = createAction(
  ActionTypes.SETTINGS_GLOBAL_GET_CURRENT_SUCCES,
  props<{ data: SettingGlobal }>()
);


export const settingsGlobalGetCurrentFailureAction = createAction(
  ActionTypes.SETTINGS_GLOBAL_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const settingsGlobalGetCurrentReset = createAction(
  ActionTypes.SETTINGS_GLOBAL_GET_CURRENT_RESET,
);








// Setting global delete
export const settingGlobalDeleteAction = createAction(
  ActionTypes.SETTING_GLOBAL_DELETE,
  props<{ id: string | undefined }>()
);


export const settingGlobalDeleteSuccessAction = createAction(
  ActionTypes.SETTING_GLOBAL_DELETE_SUCCES,
  props<{ data: string }>()
);


export const settingGlobalDeleteFailureAction = createAction(
  ActionTypes.SETTING_GLOBAL_DELETE_FAILURE,
  props<{ errors: any }>()
);










// No more Settings global List

export const noMoreSettingsGlobalListAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_GLOBAL_LIST,
  props<{ data: boolean }>()
);

export const noMoreSettingsGlobalListFalseAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_GLOBAL_LIST_FALSE,
);

export const noMoreSettingsGlobalListTrueAction = createAction(
  ActionTypes.NO_MORE_SETTINGS_GLOBAL_LIST_TRUE,
);











// Update Setting global
export const updateSettingsGlobalAction = createAction(
  ActionTypes.UPDATE_SETTINS_GLOBAL,
  props<{ settingGlobal: SettingGlobal}>()
)


export const updateSettingsGlobalSuccessAction = createAction(
  ActionTypes.UPDATE_SETTINS_GLOBAL_SUCCESS,
  props<{ data: SettingGlobal }>()
);




export const updateSettingsGlobalFailureAction = createAction(
  ActionTypes.UPDATE_SETTINS_GLOBAL_FAILURE,
  props<{ errors: any }>()
)

