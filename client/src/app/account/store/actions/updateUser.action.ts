import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/account/store/actionTypes'
import { UserResponceRegister } from '../../types/account.interfaces';



export const updateUserAction = createAction(
    ActionTypes.UPDATE_USER,
    props<{ user: UserResponceRegister, avatar: File }>()
)


export const updateUserSuccessAction = createAction(
    ActionTypes.UPDATE_USER_SUCCESS,
    props<{ data: UserResponceRegister }>()
);




export const updateUserFailureAction = createAction(
    ActionTypes.UPDATE_STATE_FAILURE,
    props<{ errors: any }>()
)
