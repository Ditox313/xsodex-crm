import {createReducer, on, Action} from '@ngrx/store'
import { AccountStateInterface } from '../types/account.interfaces';
import {
  registerAction, registerFailureAction, registerSuccessAction,
  // registerSuccessAction,
  // registerFailureAction,
} from 'src/app/account/store/actions/register.action';




// Инициализируем состояние
const initialState: AccountStateInterface = {
  currentUser: null,
  isLoggedIn: false,
  token: '',
  isLoading: false,
  validationErrors: null
};




// Создаем редьюсер
const accountReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AccountStateInterface => ({
      ...state,
      isLoading: true,
      validationErrors: null
    })
  ),

  on(
    registerSuccessAction,
    (state, action): AccountStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null
    })
  ),
  on(
    registerFailureAction,
    (state, action): AccountStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  // on(
  //   loginAction,
  //   (state): AuthStateInterface => ({
  //     ...state,
  //   })
  // ),

  // on(
  //   loginSuccessAction,
  //   (state, action): AuthStateInterface => ({
  //     ...state,
  //     isLoggedIn: true,
  //     token: action.token,
  //     currentUser: action.currentUser,
  //   })
  // ),
  // on(
  //   loginFailureAction,
  //   (state, action): AuthStateInterface => ({
  //     ...state,
  //   })
  // )
);



// Экспортируем Reducer
export function reducers(state: AccountStateInterface, action: Action) {
  return accountReducer(state, action)
}
