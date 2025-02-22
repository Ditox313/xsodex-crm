import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/bookings/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { Act, Booking, BookingsParamsFetch, Pay } from '../../types/bookings.interfaces';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';


// Add booking
export const addBookingAction = createAction(
  ActionTypes.ADD_BOOKING,
  props<{ booking: Booking }>()
);

export const addBookingSuccessAction = createAction(
  ActionTypes.ADD_BOOKING_SUCCESS,
);


export const addBookingFailureAction = createAction(
  ActionTypes.ADD_BOOKING_FAILURE,
  props<{ errors: any }>()
);








// Edit Booking
export const editBookingAction = createAction(
  ActionTypes.EDIT_BOOKING,
  props<{ booking: Booking }>()
)


export const editBookingSuccessAction = createAction(
  ActionTypes.EDIT_BOOKING_SUCCES,
  props<{ booking: Booking }>()
);




export const editBookingFailureAction = createAction(
  ActionTypes.EDIT_BOOKING_FAILURE,
  props<{ errors: any }>()
)









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






// bookingsListForSmenaAction
export const bookingsListForSmenaAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_SMENA,
  props<{smena_id:string}>()
);


export const bookingsListForSmenaSuccessAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_SMENA_SUCCES,
  props<{ data: Booking[] }>()
);


export const bookingsListForSmenaFailureAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_SMENA_FAILURE,
  props<{ errors: any }>()
);


export const bookingsListForSmenaResetAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_SMENA_RESET,
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








// Clients All for search booking
export const clientsForSearchListAction = createAction(
  ActionTypes.CLIENTS_FOR_SEARCH,
  props<{ params?: BookingsParamsFetch }>()
);


export const clientsForSearchListSuccessAction = createAction(
  ActionTypes.CLIENTS_FOR_SEARCH_LIST_SUCCES,
  props<{ data: any[] }>()
);


export const clientsForSearchListFailureAction = createAction(
  ActionTypes.CLIENTS_FOR_SEARCH_LIST_FAILURE,
  props<{ errors: any }>()
);


export const clientsForSearchListResetAction = createAction(
  ActionTypes.CLIENTS_FOR_SEARCH_LIST_RESET,
);


export const noMoreClientsForSearchListAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FOR_SEARCH_LIST,
  props<{ data: boolean }>()
);

export const noMoreClientsForSearchListFalseAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FOR_SEARCH_LIST_FALSE,
);

export const noMoreClientsForSearchListTrueAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FOR_SEARCH_LIST_TRUE,
);
















// Booking delete
export const bookingDeleteAction = createAction(
  ActionTypes.BOOKING_DELETE,
  props<{ id: string | undefined }>()
);


export const bookingDeleteSuccessAction = createAction(
  ActionTypes.BOOKING_DELETE_SUCCES,
  props<{ data: string }>()
);


export const bookingDeleteFailureAction = createAction(
  ActionTypes.BOOKING_DELETE_FAILURE,
  props<{ errors: any }>()
);








// Update State Bookings
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








// Поиск
export const clientsSearchAction = createAction(
  ActionTypes.CLIENTS_SEARCH,
  props<{ data: any }>()
);


export const clientsSearchSuccessAction = createAction(
  ActionTypes.CLIENTS_SEARCH_SUCCES,
  props<{ data: any[] }>()
);


export const clientsSearchFailureAction = createAction(
  ActionTypes.CLIENTS_SEARCH_FAILURE,
  props<{ errors: any }>()
);


export const clientsSearchResetAction = createAction(
  ActionTypes.CLIENTS_SEARCH_RESET,
);





// Выбор клиента для брони
export const changeCleintForBookingAction = createAction(
  ActionTypes.CHANGE_CLIENT_FOR_BOOKING,
  props<{ client: any }>()
);
export const changeCleintForBookingResetAction = createAction(
  ActionTypes.CHANGE_CLIENT_FOR_BOOKING_RESET,
);





// Get Booking Current
export const bookingGetCurrent = createAction(
  ActionTypes.BOOKING_GET_CURRENT,
  props<{ id: string }>()
);


export const bookingGetCurrentSuccessAction = createAction(
  ActionTypes.BOOKING_GET_CURRENT_SUCCES,
  props<{ data: Booking }>()
);


export const bookingGetCurrentFailureAction = createAction(
  ActionTypes.BOOKING_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const bookingGetCurrentReset = createAction(
  ActionTypes.BOOKING_GET_CURRENT_RESET,
);





//Booking create pay
export const bookingCreatePayAction = createAction(
  ActionTypes.BOOKING_CREATE_PAY,
  props<{ pay_1: Pay, pay_2: Pay, pay_3: Pay, pay_4: Pay, pay_5: Pay }>()
);


export const bookingCreatePaySuccessAction = createAction(
  ActionTypes.BOOKING_CREATE_PAY_SUCCES,
  props<{ data: any }>()
);


export const bookingCreatePayFailureAction = createAction(
  ActionTypes.BOOKING_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);









// Pays List
export const paysListAction = createAction(
  ActionTypes.PAYS_LIST,
  props<{ id: string | undefined}>()
);


export const paysListSuccessAction = createAction(
  ActionTypes.PAYS_LIST_SUCCES,
  props<{ data: Pay[] }>()
);


export const paysListFailureAction = createAction(
  ActionTypes.PAYS_LIST_FAILURE,
  props<{ errors: any }>()
);


export const paysListResetAction = createAction(
  ActionTypes.PAYS_LIST_RESET,
);









// Current client for act
export const currentClientForActAction = createAction(
  ActionTypes.CURRENT_CLIENT_FOR_ACT,
  props<{ id: string | undefined }>()
);


export const currentClientForActSuccessAction = createAction(
  ActionTypes.CURRENT_CLIENT_FOR_ACT_SUCCES,
  props<{ data: ClientFiz | ClientLaw }>()
);


export const currentClientForActFailureAction = createAction(
  ActionTypes.CURRENT_CLIENT_FOR_ACT_FAILURE,
  props<{ errors: any }>()
);


export const currentClientForActResetAction = createAction(
  ActionTypes.CURRENT_CLIENT_FOR_ACT_RESET,
);






// Add act booking
export const addActBookingAction = createAction(
  ActionTypes.ADD_ACT_BOOKING,
  props<{ act: Act}>()
);

export const addActBookingSuccessAction = createAction(
  ActionTypes.ADD_ACT_BOOKING_SUCCESS,
);


export const addActBookingFailureAction = createAction(
  ActionTypes.ADD_ACT_BOOKING_FAILURE,
  props<{ errors: any }>()
);






// Toggle status booking
export const toggleStatusBookingAction = createAction(
  ActionTypes.TOGGLE_STATUS_BOOKING,
  props<{ bookingId: string  | undefined}>()
);

export const toggleStatusSuccessAction = createAction(
  ActionTypes.TOGGLE_STATUS_BOOKING_SUCCESS,
  props<{ booking: Booking }>()
);


export const toggleStatusFailureAction = createAction(
  ActionTypes.TOGGLE_STATUS_BOOKING_FAILURE,
  props<{ errors: any }>()
);









// Current client for act
export const currentActAction = createAction(
  ActionTypes.CURRENT_ACT,
  props<{ id: string | undefined }>()
);


export const currentActSuccessAction = createAction(
  ActionTypes.CURRENT_ACT_SUCCES,
  props<{ act: Act }>()
);


export const currentActFailureAction = createAction(
  ActionTypes.CURRENT_ACT_FAILURE,
  props<{ errors: any }>()
);


export const currentActResetAction = createAction(
  ActionTypes.CURRENT_ACT_RESET,
);








// Extend Booking
export const extendBookingAction = createAction(
  ActionTypes.EXTEND_BOOKING,
  props<{ data: any }>()
);

export const extendBookingSuccessAction = createAction(
  ActionTypes.EXTEND_BOOKING_SUCCES,
);


export const extendBookingFailureAction = createAction(
  ActionTypes.EXTEND_BOOKING_FAILURE,
  props<{ errors: any }>()
);







// Close Booking
export const closeBookingAction = createAction(
  ActionTypes.CLOSE_BOOKING,
  props<{ data: any }>()
);

export const closeBookingSuccessAction = createAction(
  ActionTypes.CLOSE_BOOKING_SUCCES,
);


export const closeBookingFailureAction = createAction(
  ActionTypes.CLOSE_BOOKING_FAILURE,
  props<{ errors: any }>()
);










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
