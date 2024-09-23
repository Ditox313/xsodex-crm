import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../actionTypes';
import { SettingAvtopark, SettingSklad, SettingsParamsFetch } from '../../types/settings.interfaces';


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










// Update Partner
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





