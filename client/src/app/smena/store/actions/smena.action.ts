import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/smena/store/actionTypes'
import { Smena, SmenaParamsFetch } from '../../types/smena.interfaces';
import { AppStateInterface } from 'src/app/shared/types/interfaces';


// Open smena
export const openSmenaAction = createAction(
  ActionTypes.SMENA,
  props<{ smena: Smena }>()
);

export const openSmenaSuccessAction = createAction(
  ActionTypes.SMENA_SUCCESS,
  props<{ smena: Smena }>()
);


export const openSmenaFailureAction = createAction(
  ActionTypes.SMENA_FAILURE,
  props<{ errors: any }>()
);






// Is opened smena
export const isOpenedSmenaAction = createAction(
  ActionTypes.SMENA_IS_OPENED,
);

export const isOpenedSmenaSuccessAction = createAction(
  ActionTypes.SMENA_IS_OPENED_SUCCES,
  props<{ smena: Smena }>()
);


export const OpenedSmenaFailureAction = createAction(
  ActionTypes.SMENA_IS_OPENED_FAILURE,
  props<{ errors: any }>()
);





// Update State Smena
export const updateStateSmenaAction = createAction(
  ActionTypes.UPDATE_STATE_SMENA,
);


export const updateStateSmenaSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_SMENA_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStateSmenaFailureAction = createAction(
  ActionTypes.UPDATE_STATE_SMENA_FAILURE,
  props<{ errors: any }>()
);





// Smena List
export const smenaListAction = createAction(
  ActionTypes.SMENA_LIST,
  props<{ params: SmenaParamsFetch }>()
);


export const smenaListSuccessAction = createAction(
  ActionTypes.SMENA_LIST_SUCCES,
  props<{ data: any }>()
);


export const smenaListFailureAction = createAction(
  ActionTypes.SMENA_LIST_FAILURE,
  props<{ errors: any }>()
);




