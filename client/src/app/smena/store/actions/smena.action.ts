import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/smena/store/actionTypes'
import { Smena, SmenaParamsFetch } from '../../types/smena.interfaces';
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { Pay } from 'src/app/bookings/types/bookings.interfaces';


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
  props<{ data: Smena[] }>()
);


export const smenaListFailureAction = createAction(
  ActionTypes.SMENA_LIST_FAILURE,
  props<{ errors: any }>()
);




// Smena List loadmore reset
export const smenaListResetAction = createAction(
  ActionTypes.SMENA_LIST_RESET,
);





// Pais List for smena
export const paysListForSmenaAction = createAction(
  ActionTypes.PAYS_LIST_FOR_SMENA,
  props<{ smenaId: string }>()
);


export const paysListForSmenaSuccessAction = createAction(
  ActionTypes.PAYS_LIST_FOR_SMENA_SUCCES,
  props<{ data: Pay[] }>()
);


export const paysListForSmenaFailureAction = createAction(
  ActionTypes.PAYS_LIST_FOR_SMENA_FAILURE,
  props<{ errors: any }>()
);


export const paysListForSmenaResetAction = createAction(
  ActionTypes.PAYS_LIST_FOR_SMENA_RESET,
);








// Smena delete
export const smenaDeleteAction = createAction(
  ActionTypes.SMENA_DELETE,
  props<{ id: string | undefined }>()
);


export const smenaDeleteSuccessAction = createAction(
  ActionTypes.SMENA_DELETE_SUCCES,
  props<{ data: string }>()
);


export const smenaDeleteFailureAction = createAction(
  ActionTypes.SMENA_DELETE_FAILURE,
  props<{ errors: any }>()
);








// No more smena

export const noMoreSmenaListAction = createAction(
  ActionTypes.NO_MORE_SMENA_LIST,
  props<{ data: boolean }>()
);

export const noMoreSmenaListFalseAction = createAction(
  ActionTypes.NO_MORE_SMENA_LIST_FALSE,
);

export const noMoreSmenaListTrueAction = createAction(
  ActionTypes.NO_MORE_SMENA_LIST_TRUE,
);








// Get Smena Current
export const smenaGetCurrent = createAction(
  ActionTypes.SMENA_GET_CURRENT,
  props<{ id: string }>()
);


export const smenaGetCurrentSuccessAction = createAction(
  ActionTypes.SMENA_GET_CURRENT_SUCCES,
  props<{ data: Smena }>()
);


export const smenaGetCurrentFailureAction = createAction(
  ActionTypes.SMENA_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const smenaGetCurrentReset = createAction(
  ActionTypes.SMENA_GET_CURRENT_RESET,
);







// Close Smena
export const smenaCloseAction = createAction(
  ActionTypes.SMENA_CLOSE,
  props<{ id: string, close_date: string }>()
);


export const smenaCloseSuccessAction = createAction(
  ActionTypes.SMENA_CLOSE_SUCCES,
);


export const smenaCloseFailureAction = createAction(
  ActionTypes.SMENA_CLOSE_FAILURE,
  props<{ errors: any }>()
);



