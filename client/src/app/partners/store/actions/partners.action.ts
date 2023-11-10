import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/partners/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { Partner } from '../../types/partners.interfaces';


// Add partner
export const addPartnerAction = createAction(
  ActionTypes.ADD_PARTNER,
  props<{ partner: Partner, file_1?: File, file_2?: File, }>()
);

export const addPartnerSuccessAction = createAction(
  ActionTypes.ADD_PARTNER_SUCCESS,
  props<{ partner: Partner }>()
);


export const addPartnerFailureAction = createAction(
  ActionTypes.ADD_PARTNER_FAILURE,
  props<{ errors: any }>()
);








// Cars List
// export const carsListAction = createAction(
//   ActionTypes.CARS_LIST,
//   props<{ params: CarsParamsFetch }>()
// );


// export const carsListSuccessAction = createAction(
//   ActionTypes.CARS_LIST_SUCCES,
//   props<{ data: Car[] }>()
// );


// export const carsListFailureAction = createAction(
//   ActionTypes.CARS_LIST_FAILURE,
//   props<{ errors: any }>()
// );


// export const carsListResetAction = createAction(
//   ActionTypes.CARS_LIST_RESET,
// );





// No more Cars List

// export const noMoreCarsListAction = createAction(
//   ActionTypes.NO_MORE_CARS_LIST,
//   props<{ data: boolean }>()
// );

// export const noMoreCarsListFalseAction = createAction(
//   ActionTypes.NO_MORE_CARS_LIST_FALSE,
// );

// export const noMoreCarsListTrueAction = createAction(
//   ActionTypes.NO_MORE_CARS_LIST_TRUE,
// );






// Car delete
// export const carDeleteAction = createAction(
//   ActionTypes.CAR_DELETE,
//   props<{ id: string | undefined }>()
// );


// export const carDeleteSuccessAction = createAction(
//   ActionTypes.CAR_DELETE_SUCCES,
//   props<{ data: string }>()
// );


// export const carDeleteFailureAction = createAction(
//   ActionTypes.CAR_DELETE_FAILURE,
//   props<{ errors: any }>()
// );








// Update State Cars
export const updateStatePartnersAction = createAction(
  ActionTypes.UPDATE_STATE_PARTNERS,
);


export const updateStatePartnersSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_PARTNERS_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStatePartnersFailureAction = createAction(
  ActionTypes.UPDATE_STATE_PARTNERS_FAILURE,
  props<{ errors: any }>()
);







// Get Car Current
// export const carGetCurrent = createAction(
//   ActionTypes.CAR_GET_CURRENT,
//   props<{ id: string }>()
// );


// export const carGetCurrentSuccessAction = createAction(
//   ActionTypes.CAR_GET_CURRENT_SUCCES,
//   props<{ data: Car }>()
// );


// export const carGetCurrentFailureAction = createAction(
//   ActionTypes.CAR_GET_CURRENT_FAILURE,
//   props<{ errors: any }>()
// );

// export const carGetCurrentReset = createAction(
//   ActionTypes.CAR_GET_CURRENT_RESET,
// );










// Update Car
// export const updateCarAction = createAction(
//   ActionTypes.UPDATE_CAR,
//   props<{ car: Car, avatar: File }>()
// )


// export const updateCarSuccessAction = createAction(
//   ActionTypes.UPDATE_CAR_SUCCESS,
//   props<{ data: Car }>()
// );




// export const updateCarFailureAction = createAction(
//   ActionTypes.UPDATE_CAR_FAILURE,
//   props<{ errors: any }>()
// )
