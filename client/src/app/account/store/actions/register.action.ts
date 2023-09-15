import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/account/store/actionTypes'
import { UserRequestRegister, UserResponceRegister } from '../../types/account.interfaces';


// Экшн для регистрации
export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{user: UserRequestRegister}>()
)


// Экшн для регистрации - успех
export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
);



// Экшн для регистрации - ошибка
export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: any }>()
)
