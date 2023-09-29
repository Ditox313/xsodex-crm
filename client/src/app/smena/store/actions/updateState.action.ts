import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/smena/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';



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