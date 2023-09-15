import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/account/store/actionTypes'
import { UserRequestLogin, UserResponceLogin } from '../../types/account.interfaces';



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
