import {createReducer, on, Action} from '@ngrx/store'
import { AccountStateInterface } from '../types/account.interfaces';
import { loginAction, loginFailureAction, loginSuccessAction, logoutAction, logoutFailureAction, logoutSuccessAction, registerAction, registerFailureAction, registerSuccessAction, updateStateFailureAction, updateStateSuccessAction, updateUserAction, updateUserFailureAction, updateUserSuccessAction } from './actions/account.action';





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
  ),
  on(
    logoutAction,
    (state): AccountStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    logoutSuccessAction,
    (state): AccountStateInterface => ({
      ...state,
      isLoggedIn: false,
      token: '',
      currentUser: null,
      isLoading: false,
    })
  ),
  on(
    logoutFailureAction,
    (state, action): AccountStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })
  ),
  on(
    updateStateSuccessAction,
    (state, action): AccountStateInterface => ({
      ...state,
      isLoggedIn: action.data.account.isLoggedIn,
      token: action.data.account.token,
      currentUser: action.data.account.currentUser,
      isLoading: action.data.account.isLoading,
      validationErrors: action.data.account.validationErrors
    }),
  ),
  on(
    updateStateFailureAction,
    (state, action): AccountStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),
  on(
    updateUserAction,
    (state): AccountStateInterface => ({
      ...state,
      isLoading: true,
      validationErrors: null
    })
  ),
  on(
    updateUserSuccessAction,
    (state, action): AccountStateInterface => ({
      ...state,
      isLoggedIn: true,
      currentUser: action.data,
      isLoading: false,
      validationErrors: null
    })
  ),
  on(
    updateUserFailureAction,
    (state, action): AccountStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),

  
);



// Экспортируем Reducer
export function reducers(state: AccountStateInterface, action: Action) {
  return accountReducer(state, action)
}
