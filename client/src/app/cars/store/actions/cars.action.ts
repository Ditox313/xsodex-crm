import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/cars/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { Car, CarsParamsFetch } from '../../types/cars.interfaces';


// Add car
export const addCarAction = createAction(
  ActionTypes.ADD_CAR,
  props<{ car: Car, avatar?: File }>()
);

export const addCarSuccessAction = createAction(
  ActionTypes.ADD_CAR_SUCCESS,
  props<{ car: Car }>()
);


export const addCarFailureAction = createAction(
  ActionTypes.ADD_CAR_FAILURE,
  props<{ errors: any }>()
);








// Cars List
export const carsListAction = createAction(
  ActionTypes.CARS_LIST,
  props<{ params: CarsParamsFetch }>()
);


export const carsListSuccessAction = createAction(
  ActionTypes.CARS_LIST_SUCCES,
  props<{ data: Car[] }>()
);


export const carsListFailureAction = createAction(
  ActionTypes.CARS_LIST_FAILURE,
  props<{ errors: any }>()
);


export const carsListResetAction = createAction(
  ActionTypes.CARS_LIST_RESET,
);






