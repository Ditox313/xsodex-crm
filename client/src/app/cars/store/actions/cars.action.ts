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





// No more Cars List

export const noMoreCarsListAction = createAction(
  ActionTypes.NO_MORE_CARS_LIST,
  props<{ data: boolean }>()
);

export const noMoreCarsListFalseAction = createAction(
  ActionTypes.NO_MORE_CARS_LIST_FALSE,
);

export const noMoreCarsListTrueAction = createAction(
  ActionTypes.NO_MORE_CARS_LIST_TRUE,
);






// Car delete
export const carDeleteAction = createAction(
  ActionTypes.CAR_DELETE,
  props<{ id: string | undefined }>()
);


export const carDeleteSuccessAction = createAction(
  ActionTypes.CAR_DELETE_SUCCES,
  props<{ data: string }>()
);


export const carDeleteFailureAction = createAction(
  ActionTypes.CAR_DELETE_FAILURE,
  props<{ errors: any }>()
);




