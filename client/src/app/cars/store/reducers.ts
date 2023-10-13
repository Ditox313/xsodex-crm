import {createReducer, on, Action} from '@ngrx/store'
import { CarsStateInterface } from '../types/cars.interfaces';
import { addCarAction, addCarFailureAction, addCarSuccessAction, carsListAction, carsListFailureAction, carsListSuccessAction } from './actions/cars.action';





// Инициализируем состояние
const initialState: CarsStateInterface = {
  isLoading: false,
  validationErrors: null,
  carsList: null,
  noMoreCarsList: true,
  currentCar: null
};




// Создаем редьюсер
const carsReducer = createReducer(
  initialState,
  on(
    addCarAction,
    (state): CarsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addCarSuccessAction,
    (state, action): CarsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addCarFailureAction,
    (state, action): CarsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










  on(
    carsListAction,
    (state): CarsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    carsListSuccessAction,
    (state, action): CarsStateInterface => ({
      ...state,
      carsList: state.carsList ? [...state.carsList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    carsListFailureAction,
    (state, action): CarsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  // on(
  //   noMoreSmenaListAction,
  //   (state, action): SmenaStateInterface => ({
  //     ...state,
  //     noMoreSmenaList: action.data,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreSmenaListFalseAction,
  //   (state, action): SmenaStateInterface => ({
  //     ...state,
  //     noMoreSmenaList: false,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreSmenaListTrueAction,
  //   (state, action): SmenaStateInterface => ({
  //     ...state,
  //     noMoreSmenaList: true,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   smenaListResetAction,
  //   (state): SmenaStateInterface => ({
  //     ...state,
  //     smenaList: null,
  //   })
  // ),


);





// Экспортируем Reducer
export function reducers(state: CarsStateInterface, action: Action) {
  return carsReducer(state, action)
}
