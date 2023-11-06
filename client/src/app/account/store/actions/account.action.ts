import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/account/store/actionTypes'
import { UserRequestLogin, UserRequestRegister, UserResponceLogin, UserResponceRegister } from '../../types/account.interfaces';
import { AppStateInterface } from 'src/app/shared/types/interfaces';


// Login
export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ user: UserRequestLogin }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ data: UserResponceLogin }>()
);


export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: any }>()
);






// Logout
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









// Register
export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ user: UserRequestRegister }>()
)



export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
);




export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: any }>()
)






// Update State
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






// Update User
export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ user: UserResponceRegister, avatar: File }>()
)


export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ data: UserResponceRegister }>()
);




export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE,
  props<{ errors: any }>()
)

