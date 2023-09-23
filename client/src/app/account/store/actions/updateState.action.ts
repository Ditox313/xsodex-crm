import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/account/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';



export const updateStateAction = createAction(
    ActionTypes.UPDATE_STATE,
);


export const updateStateSuccessAction = createAction(
    ActionTypes.UPDATE_STATE_SUCCESS,
    props<{ data: AppStateInterface }>()
);


export const updateStateFailureAction = createAction(
    ActionTypes.UPDATE_STATE_FAILURE,
    props<{ errors: any }>()
);