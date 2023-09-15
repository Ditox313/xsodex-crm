import {createReducer, on, Action} from '@ngrx/store'
import { AccountStateInterface } from '../types/account.interfaces';
import {
  registerAction, registerFailureAction, registerSuccessAction,
  // registerSuccessAction,
  // registerFailureAction,
} from 'src/app/account/store/actions/register.action';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';




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
  on(
    loginAction,
    (state): AccountStateInterface => ({
      ...state,
      isLoading: true,
      validationErrors: null
    })
  ),

  on(
    loginSuccessAction,
    (state, action): AccountStateInterface => ({
      ...state,
      isLoggedIn: true,
      token: action.data.token,
      currentUser: action.data.currentUser,
      isLoading: false,
      validationErrors: null
    })
  ),
  on(
    loginFailureAction,
    (state, action): AccountStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  )
);



// Экспортируем Reducer
export function reducers(state: AccountStateInterface, action: Action) {
  return accountReducer(state, action)
}
