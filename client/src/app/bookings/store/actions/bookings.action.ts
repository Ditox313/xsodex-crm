import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/bookings/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { Booking, BookingsParamsFetch } from '../../types/bookings.interfaces';


// Add partner
// export const addPartnerAction = createAction(
//   ActionTypes.ADD_PARTNER,
//   props<{ partner: Partner, file_1?: File, file_2?: File }>()
// );

// export const addPartnerSuccessAction = createAction(
//   ActionTypes.ADD_PARTNER_SUCCESS,
//   props<{ partner: Partner }>()
// );


// export const addPartnerFailureAction = createAction(
//   ActionTypes.ADD_PARTNER_FAILURE,
//   props<{ errors: any }>()
// );








// Bookings List
export const bookingsListAction = createAction(
  ActionTypes.BOOKINGS_LIST,
  props<{ params?: BookingsParamsFetch  }>()
);


export const bookingsListSuccessAction = createAction(
  ActionTypes.BOOKINGS_LIST_SUCCES,
  props<{ data: Booking[] }>()
);


export const bookingsListFailureAction = createAction(
  ActionTypes.BOOKINGS_LIST_FAILURE,
  props<{ errors: any }>()
);


export const bookingsListResetAction = createAction(
  ActionTypes.BOOKINGS_LIST_RESET,
);





// No more Bookings List

export const noMoreBookingsListAction = createAction(
  ActionTypes.NO_MORE_BOOKINGS_LIST,
  props<{ data: boolean }>()
);

export const noMoreBookingsListFalseAction = createAction(
  ActionTypes.NO_MORE_BOOKINGS_LIST_FALSE,
);

export const noMoreBookingsListTrueAction = createAction(
  ActionTypes.NO_MORE_BOOKINGS_LIST_TRUE,
);






// Partner delete
// export const partnerDeleteAction = createAction(
//   ActionTypes.PARTNER_DELETE,
//   props<{ id: string | undefined }>()
// );


// export const partnerDeleteSuccessAction = createAction(
//   ActionTypes.PARTNER_DELETE_SUCCES,
//   props<{ data: string }>()
// );


// export const partnerDeleteFailureAction = createAction(
//   ActionTypes.PARTNER_DELETE_FAILURE,
//   props<{ errors: any }>()
// );








// Update State Cars
export const updateStateBookingsAction = createAction(
  ActionTypes.UPDATE_STATE_BOOKINGS,
);


export const updateStateBookingsSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_BOOKINGS_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStateBookingsFailureAction = createAction(
  ActionTypes.UPDATE_STATE_BOOKINGS_FAILURE,
  props<{ errors: any }>()
);







// Get Partners Current
// export const partnerGetCurrent = createAction(
//   ActionTypes.PARTNER_GET_CURRENT,
//   props<{ id: string }>()
// );


// export const partnerGetCurrentSuccessAction = createAction(
//   ActionTypes.PARTNER_GET_CURRENT_SUCCES,
//   props<{ data: Partner }>()
// );


// export const partnerGetCurrentFailureAction = createAction(
//   ActionTypes.PARTNER_GET_CURRENT_FAILURE,
//   props<{ errors: any }>()
// );

// export const partnerGetCurrentReset = createAction(
//   ActionTypes.PARTNER_GET_CURRENT_FAILURE,
// );










// Update Partner
// export const updatePartnerAction = createAction(
//   ActionTypes.UPDATE_PARTNER,
//   props<{ partner: Partner, file_1?: File, file_2?: File }>()
// )


// export const updatePartnerSuccessAction = createAction(
//   ActionTypes.UPDATE_PARTNER_SUCCESS,
//   props<{ data: Partner }>()
// );




// export const updatePartnerFailureAction = createAction(
//   ActionTypes.UPDATE_PARTNER_FAILURE,
//   props<{ errors: any }>()
// )






// Partners List no params
// export const partnersListNoParamsAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS,
// );


// export const partnersListNoParamsSuccessAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS_SUCCES,
//   props<{ data: Partner[] }>()
// );


// export const partnersListNoParamsFailureAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS_FAILURE,
//   props<{ errors: any }>()
// );


// export const partnersListNoParamsResetAction = createAction(
//   ActionTypes.PARTNERS_LIST_NO_PARAMS_RESET,
// );