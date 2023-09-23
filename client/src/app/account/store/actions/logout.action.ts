import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/account/store/actionTypes'



export const logoutAction = createAction(
    ActionTypes.LOGOUT,
);


export const logoutSuccessAction = createAction(
    ActionTypes.LOGOUT_SUCCESS,
);


export const logoutFailureAction = createAction(
    ActionTypes.LOGOUT_FAILURE,
    props<{ errors: any }>()
);
