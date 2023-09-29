import {createReducer, on, Action} from '@ngrx/store'
import { SmenaStateInterface } from '../types/smena.interfaces';
import { OpenedSmenaFailureAction, isOpenedSmenaAction, isOpenedSmenaSuccessAction, openSmenaAction, openSmenaFailureAction, openSmenaSuccessAction } from './actions/smena.action';
import { updateStateSmenaFailureAction, updateStateSmenaSuccessAction } from './actions/updateState.action';




// Инициализируем состояние
const initialState: SmenaStateInterface = {
  isOpenedSmena: null,
  validationErrors: null
};




// Создаем редьюсер
const smenaReducer = createReducer(
  initialState,
  on(
    openSmenaAction,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
    })
  ),

  on(
    openSmenaSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isOpenedSmena: action.smena,
      validationErrors: null,
    })
  ),
  on(
    openSmenaFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),






  on(
    updateStateSmenaSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isOpenedSmena: action.data.smena.isOpenedSmena,
      validationErrors: action.data.smena.validationErrors
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
);



// Экспортируем Reducer
export function reducers(state: SmenaStateInterface, action: Action) {
  return smenaReducer(state, action)
}
