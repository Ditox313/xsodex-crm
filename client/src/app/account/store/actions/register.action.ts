import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/account/store/actionTypes'
import { UserRequestRegister } from '../../types/account.interfaces';


// Экшн для регистрации
export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{user: UserRequestRegister}>()
)


// Экшн для регистрации - успех
// export const registerSuccessAction = createAction(
//   ActionTypes.REGISTER_SUCCESS,
//   props<{ currentUser: User }>()
// );



// Экшн для регистрации - ошибка
// export const registerFailureAction = createAction(
//   ActionTypes.REGISTER_FAILURE,
//   props<{errors: any}>()
// )
