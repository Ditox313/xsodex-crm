import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/smena/store/actionTypes'
import { Smena } from '../../types/smena.interfaces';


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



