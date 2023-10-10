import {createReducer, on, Action} from '@ngrx/store'
import { SmenaStateInterface } from '../types/smena.interfaces';
import { OpenedSmenaFailureAction, isOpenedSmenaAction, isOpenedSmenaSuccessAction, noMoreSmenaListAction, noMoreSmenaListResetAction, openSmenaAction, 
  openSmenaFailureAction, openSmenaSuccessAction, smenaCloseAction, smenaCloseFailureAction, smenaCloseSuccessAction, smenaDeleteAction, smenaDeleteFailureAction, smenaDeleteSuccessAction, smenaGetCurrent, smenaGetCurrentFailureAction, smenaGetCurrentReset, smenaGetCurrentSuccessAction, smenaListAction, smenaListFailureAction, smenaListResetAction, smenaListSuccessAction, updateStateSmenaFailureAction, updateStateSmenaSuccessAction } from './actions/smena.action';




// Инициализируем состояние
const initialState: SmenaStateInterface = {
  isOpenedSmena: null,
  isLoading: false,
  validationErrors: null,
  smenaList: null,
  noMoreSmenaList: false,
  currentSmena: null
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
      smenaList: state.smenaList ? [...state.smenaList, ...action.data] : action.data,
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
    noMoreSmenaListAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      noMoreSmenaList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreSmenaListResetAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      noMoreSmenaList: false,
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










  on(
    smenaDeleteAction,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    smenaDeleteSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSmena: null,
      smenaList: state.smenaList ? state.smenaList.filter((item) => item._id !== action.data) : state.smenaList,
    })
  ),
  on(
    smenaDeleteFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentSmena: null,
    })
  ),








  on(
    smenaGetCurrent,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    smenaGetCurrentSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentSmena: action.data
    })
  ),
  on(
    smenaGetCurrentFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    smenaGetCurrentReset,
    (state): SmenaStateInterface => ({
      ...state,
      currentSmena: null
    })
  ),










  on(
    smenaCloseAction,
    (state): SmenaStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    smenaCloseSuccessAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    smenaCloseFailureAction,
    (state, action): SmenaStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
);





// Экспортируем Reducer
export function reducers(state: SmenaStateInterface, action: Action) {
  return smenaReducer(state, action)
}
