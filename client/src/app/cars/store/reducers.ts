import {createReducer, on, Action} from '@ngrx/store'
import { CarsStateInterface } from '../types/cars.interfaces';
import { addCarAction, addCarFailureAction, addCarSuccessAction, carDeleteAction, carDeleteFailureAction, carDeleteSuccessAction, carsListAction, carsListFailureAction, carsListResetAction, carsListSuccessAction, noMoreCarsListAction, noMoreCarsListFalseAction, updateStateCarsFailureAction, updateStateCarsSuccessAction } from './actions/cars.action';





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
  on(
    carsListResetAction,
    (state): CarsStateInterface => ({
      ...state,
      carsList: null,
    })
  ),
  on(
    noMoreCarsListAction,
    (state, action): CarsStateInterface => ({
      ...state,
      noMoreCarsList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreCarsListFalseAction,
    (state, action): CarsStateInterface => ({
      ...state,
      noMoreCarsList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreCarsListAction,
    (state, action): CarsStateInterface => ({
      ...state,
      noMoreCarsList: true,
      isLoading: false,
    })
  ),








  on(
    carDeleteAction,
    (state): CarsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    carDeleteSuccessAction,
    (state, action): CarsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentCar: null,
      carsList: state.carsList ? state.carsList.filter((item) => item._id !== action.data) : state.carsList,
    })
  ),
  on(
    carDeleteFailureAction,
    (state, action): CarsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
      currentCar: null,
    })
  ),








  on(
    updateStateCarsSuccessAction,
    (state, action): CarsStateInterface => ({
      ...state,
      isLoading: action.data.cars.isLoading,
      validationErrors: action.data.cars.validationErrors,
      carsList: action.data.cars.carsList,
      noMoreCarsList: action.data.cars.noMoreCarsList,
      currentCar: action.data.cars.currentCar
    }),
  ),
  on(
    updateStateCarsFailureAction,
    (state, action): CarsStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),

);





// Экспортируем Reducer
export function reducers(state: CarsStateInterface, action: Action) {
  return carsReducer(state, action)
}
