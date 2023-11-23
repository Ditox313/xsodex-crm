import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../actionTypes';
import { SettingAvtopark, SettingsParamsFetch } from '../../types/settings.interfaces';


// Add partner
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
  props<{ params?: SettingsParamsFetch  }>()
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







// Get Partners Current
// export const partnerGetCurrent = createAction(
//   ActionTypes.PARTNER_GET_CURRENT,
//   props<{ id: string }>()
// );


// export const partnerGetCurrentSuccessAction = createAction(
//   ActionTypes.PARTNER_GET_CURRENT_SUCCES,
//   props<{ data: Partner }>()
// );


// export const partnerGetCurrentFailureAction = createAction(
//   ActionTypes.PARTNER_GET_CURRENT_FAILURE,
//   props<{ errors: any }>()
// );

// export const partnerGetCurrentReset = createAction(
//   ActionTypes.PARTNER_GET_CURRENT_FAILURE,
// );










// Update Partner
// export const updatePartnerAction = createAction(
//   ActionTypes.UPDATE_PARTNER,
//   props<{ partner: Partner, file_1?: File, file_2?: File }>()
// )


// export const updatePartnerSuccessAction = createAction(
//   ActionTypes.UPDATE_PARTNER_SUCCESS,
//   props<{ data: Partner }>()
// );




// export const updatePartnerFailureAction = createAction(
//   ActionTypes.UPDATE_PARTNER_FAILURE,
//   props<{ errors: any }>()
// )






// Partners List no params
// export const partnersListNoParamsAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS,
// );


// export const partnersListNoParamsSuccessAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS_SUCCES,
//   props<{ data: Partner[] }>()
// );


// export const partnersListNoParamsFailureAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS_FAILURE,
//   props<{ errors: any }>()
// );


// export const partnersListNoParamsResetAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS_RESET,
// );
