import {createReducer, on, Action} from '@ngrx/store'
import { SmenaStateInterface } from '../types/smena.interfaces';
import { OpenedSmenaFailureAction, isOpenedSmenaAction, isOpenedSmenaSuccessAction, openSmenaAction, 
  openSmenaFailureAction, openSmenaSuccessAction, smenaListAction, smenaListFailureAction, smenaListResetAction, smenaListSuccessAction, updateStateSmenaFailureAction, updateStateSmenaSuccessAction } from './actions/smena.action';




// Инициализируем состояние
const initialState: SmenaStateInterface = {
  isOpenedSmena: null,
  isLoading: false,
  validationErrors: null,
  smenaList: null,
};




// Создаем редьюсер
const smenaReducer = createReducer(
  initialState,
  on(
    openSmenaAction,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    openSmenaSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isOpenedSmena: action.smena,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    openSmenaFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),






  on(
    updateStateSmenaSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isOpenedSmena: action.data.smena.isOpenedSmena,
      validationErrors: action.data.smena.validationErrors,
    }),
  ),
  on(
    updateStateSmenaFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),

  

  


  on(
    isOpenedSmenaAction,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
    })
  ),

  on(
    isOpenedSmenaSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isOpenedSmena: action.smena,
      validationErrors: null,
    })
  ),
  on(
    OpenedSmenaFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  on(
    smenaListAction,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    smenaListSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      smenaList: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    smenaListFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),








  on(
    smenaListResetAction,
    (state): SmenaStateInterface => ({
      ...state,
      smenaList: null,
    })
  ),
);






// Экспортируем Reducer
export function reducers(state: SmenaStateInterface, action: Action) {
  return smenaReducer(state, action)
}
