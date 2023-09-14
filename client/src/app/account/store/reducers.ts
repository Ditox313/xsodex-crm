import {createReducer, on, Action} from '@ngrx/store'


import {
  registerAction,
  // registerSuccessAction,
  // registerFailureAction,
} from 'src/app/account/store/actions/register.action';

import { AccountStateInterface } from '../types/account.interfaces';


// Инициализируем состояние
const initialState: AccountStateInterface = {
  currentUser: null,
  isLoggedIn: false,
  token: '',
  isSubmitting: false
};




// Создаем редьюсер
const accountReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AccountStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),

  // on(
  //   registerSuccessAction,
  //   (state, action): AccountStateInterface => ({
  //     ...state,
  //     currentUser: action.currentUser,
  //   })
  // ),
  // on(
  //   registerFailureAction,
  //   (state, action): AccountStateInterface => ({
  //     ...state,
  //   })
  // ),
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
