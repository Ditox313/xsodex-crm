import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ClientLaw, ClientLawDogovorsParamsFetch, ClientsLawParamsFetch, Dogovor, trustedPersone } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { ActionTypes } from '../../actionTypes/clientsLaw/actionTypesClientsLaw';
import { Act, Booking } from 'src/app/bookings/types/bookings.interfaces';



// Add clientFiz
export const addClientLawAction = createAction(
  ActionTypes.ADD_CLIENT_LAW,
    props<{ clientLaw: ClientLaw, files?:Array<File>, from?: string  }>()
);

export const addClientLawSuccessAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_SUCCESS,
  props<{ clientLaw: ClientLaw , from?: string}>()
);


export const addClientLawFailureAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_FAILURE,
  props<{ errors: any }>()
);



// Создать договор из брони
export const addClientLawDogovorActionFromBooking = createAction(
  ActionTypes.ADD_CLIENT_LAW_DOGOVOR_FROM_BOOKING,
  props<{ dogovor: Dogovor }>()
);

export const addClientLawDogovorSuccessActionFromBooking = createAction(
  ActionTypes.ADD_CLIENT_LAW_DOGOVOR_SUCCESS_FROM_BOOKING,
);


export const addClientLawDogovorFailureActionFromBooking = createAction(
  ActionTypes.ADD_CLIENT_LAW_DOGOVOR_FAILURE_FROM_BOOKING,
  props<{ errors: any }>()
);








// ClientsLaw List
export const clientsLawListAction = createAction(
  ActionTypes.CLIENTS_LAW_LIST,
  props<{ params: ClientsLawParamsFetch }>()
);


export const clientsLawListSuccessAction = createAction(
  ActionTypes.CLIENTS_LAW_LIST_SUCCES,
  props<{ data: ClientLaw[] }>()
);


export const clientsLawListFailureAction = createAction(
  ActionTypes.CLIENTS_LAW_LIST_FAILURE,
  props<{ errors: any }>()
);


export const clientsLawListResetAction = createAction(
  ActionTypes.CLIENTS_LAW_LIST_RESET,
);





// No more ClientsLaw List

export const noMoreClientsLawListAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_LAW_LIST,
  props<{ data: boolean }>()
);

export const noMoreClientsLawListFalseAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_LAW_LIST_FALSE,
);

export const noMoreClientsLawListTrueAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_LAW_LIST_TRUE,
);






// ClientLaw delete
export const clientLawDeleteAction = createAction(
  ActionTypes.CLIENT_LAW_DELETE,
  props<{ id: string | undefined }>()
);


export const clientLawDeleteSuccessAction = createAction(
  ActionTypes.CLIENT_LAW_DELETE_SUCCES,
  props<{ data: string }>()
);


export const clientLawDeleteFailureAction = createAction(
  ActionTypes.CLIENT_LAW_DELETE_FAILURE,
  props<{ errors: any }>()
);








// Update State ClientsLaw
export const updateStateClientsLawAction = createAction(
  ActionTypes.UPDATE_STATE_CLIENTS_LAW,
);


export const updateStateClientsLawSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_CLIENTS_LAW_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStateClientsLawFailureAction = createAction(
  ActionTypes.UPDATE_STATE_CLIENTS_LAW_FAILURE,
  props<{ errors: any }>()
);







// Get ClientLaw Current
export const clientLawGetCurrent = createAction(
  ActionTypes.CLIENT_LAW_GET_CURRENT,
  props<{ id: string }>()
);


export const clientLawGetCurrentSuccessAction = createAction(
  ActionTypes.CLIENT_LAW_GET_CURRENT_SUCCES,
  props<{ data: ClientLaw }>()
);


export const clientLawGetCurrentFailureAction = createAction(
  ActionTypes.CLIENT_LAW_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const clientLawGetCurrentReset = createAction(
  ActionTypes.CLIENT_LAW_GET_CURRENT_RESET,
);










// Update ClientLaw
export const updateClientLawAction = createAction(
  ActionTypes.UPDATE_CLIENT_LAW,
  props<{ clientLaw: ClientLaw, files?:Array<File> }>()
)


export const updateClientLawSuccessAction = createAction(
  ActionTypes.UPDATE_CLIENT_LAW_SUCCESS,
  props<{ data: ClientLaw }>()
);




export const updateClientLawFailureAction = createAction(
  ActionTypes.UPDATE_CLIENT_LAW_FAILURE,
  props<{ errors: any }>()
)





// Создать договор
export const addClientLawDogovorAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_DOGOVOR,
  props<{ dogovor: Dogovor }>()
);

export const addClientLawDogovorSuccessAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_DOGOVOR_SUCCESS,
);


export const addClientLawDogovorFailureAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_DOGOVOR_FAILURE,
  props<{ errors: any }>()
);





// ClientsFiz Dogovors List
export const clientLawDogovorsListAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVORS_LIST,
  props<{ params: ClientLawDogovorsParamsFetch }>()
);


export const clientLawDogovorsListSuccessAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVORS_LIST_SUCCES,
  props<{ data: Dogovor[] }>()
);


export const clientLawDogovorsListFailureAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVORS_LIST_FAILURE,
  props<{ errors: any }>()
);


export const clientLawDogovorsListResetAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVORS_LIST_RESET,
);






// No more ClientsLaw Dogovors List
export const noMoreClientLawDogovorsListAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_LAW_LIST,
  props<{ data: boolean }>()
);

export const noMoreClientLawDogovorsListFalseAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_LAW_LIST_FALSE,
);

export const noMoreClientLawDogovorsListTrueAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_LAW_LIST_TRUE,
);





// Delete dogovor
export const clientLawDogovorDeleteAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_DELETE,
  props<{ id: string | undefined }>()
);


export const clientLawDogovorDeleteSuccessAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_DELETE_SUCCES,
  props<{ data: string }>()
);


export const clientLawDogovorDeleteFailureAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_DELETE_FAILURE,
  props<{ errors: any }>()
);






// Get ClientLaw Dogovor Current
export const clientLawDogovorGetCurrent = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_GET_CURRENT,
  props<{ id: string }>()
);


export const clientLawDogovorGetCurrentSuccessAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_GET_CURRENT_SUCCES,
  props<{ data: Dogovor }>()
);


export const clientLawDogovorGetCurrentFailureAction = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const clientLawDogovorGetCurrentReset = createAction(
  ActionTypes.CLIENT_LAW_DOGOVOR_GET_CURRENT_RESET,
);






// Поиск
export const clientsLawSearchAction = createAction(
  ActionTypes.CLIENTS_LAW_SEARCH,
  props<{ data: any }>()
);


export const clientsLawSearchSuccessAction = createAction(
  ActionTypes.CLIENTS_LAW_SEARCH_SUCCES,
  props<{ data: ClientLaw[] }>()
);


export const clientsLawSearchFailureAction = createAction(
  ActionTypes.CLIENTS_LAW_SEARCH_FAILURE,
  props<{ errors: any }>()
);


export const clientsLawSearchResetAction = createAction(
  ActionTypes.CLIENTS_LAW_SEARCH_RESET,
);








// Acts list for clientlaw
export const actsListForClientLawAction = createAction(
  ActionTypes.ACTS_LIST_FOR_CLIENT_LAW,
  props<{ params: ClientLawDogovorsParamsFetch }>()
);


export const actsListForClientLawSuccessAction = createAction(
  ActionTypes.ACTS_LIST_FOR_CLIENT_LAW_SUCCES,
  props<{ data: Act[] }>()
);


export const actsListForClientLawFailureAction = createAction(
  ActionTypes.ACTS_LIST_FOR_CLIENT_LAW_FAILURE,
  props<{ errors: any }>()
);


export const actsListForClientLawResetAction = createAction(
  ActionTypes.ACTS_LIST_FOR_CLIENT_LAW_RESET,
);







// No more Acts list for clientfiz

export const noMoreActsListClientLawAction = createAction(
  ActionTypes.NO_MORE_ACTS_LIST_CLIENT_LAW,
  props<{ data: boolean }>()
);

export const noMoreActsListClientLawFalseAction = createAction(
  ActionTypes.NO_MORE_ACTS_LIST_CLIENT_LAW_FALSE,
);

export const noMoreActsListClientLawTrueAction = createAction(
  ActionTypes.NO_MORE_ACTS_LIST_CLIENT_LAW_TRUE,
);













// Bookings list for clientlaw
export const bookingsListForClientLawAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_CLIENT_LAW,
  props<{ params: any }>()
);


export const bookingsListForClientLawSuccessAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_CLIENT_LAW_SUCCES,
  props<{ data: Booking[] }>()
);


export const bookingsListForClientLawFailureAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_CLIENT_LAW_FAILURE,
  props<{ errors: any }>()
);


export const bookingsListForClientLawResetAction = createAction(
  ActionTypes.BOOKINGS_LIST_FOR_CLIENT_LAW_RESET,
);










// Add trusred persone
export const addTrustedPersoneAction = createAction(
  ActionTypes.ADD_TRUSTED_PERSONE,
    props<{ trustedPersone: trustedPersone, files?:Array<File> }>()
);

export const addTrustedPersoneSuccessAction = createAction(
  ActionTypes.ADD_TRUSTED_PERSONE_SUCCESS,
  props<{ trustedPersone: trustedPersone, files?:Array<File> }>()
);


export const addTrustedPersoneFailureAction = createAction(
  ActionTypes.ADD_TRUSTED_PERSONE_FAILURE,
  props<{ errors: any }>()
);








// trusred persone List
export const trustedPersoneListAction = createAction(
  ActionTypes.TRUSTED_PERSONE_LIST,
  props<{ params: ClientsLawParamsFetch }>()
);


export const trustedPersoneListSuccessAction = createAction(
  ActionTypes.TRUSTED_PERSONE_LIST_SUCCES,
  props<{ data: trustedPersone[] }>()
);


export const trustedPersoneListFailureAction = createAction(
  ActionTypes.TRUSTED_PERSONE_LIST_FAILURE,
  props<{ errors: any }>()
);


export const TrustedPersoneListResetAction = createAction(
  ActionTypes.TRUSTED_PERSONE_LIST_RESET,
);





// No more trusred persone List

export const noMoreTrustedPersoneListAction = createAction(
  ActionTypes.NO_MORE_TRUSTED_PERSONE_LIST,
  props<{ data: boolean }>()
);

export const noMoreTrustedPersoneListFalseAction = createAction(
  ActionTypes.NO_MORE_TRUSTED_PERSONE_LIST_FALSE,
);

export const noMoreTrustedPersoneListTrueAction = createAction(
  ActionTypes.NO_MORE_TRUSTED_PERSONE_LIST_TRUE,
);






// trusred persone delete
// export const trustedPersoneDeleteAction = createAction(
//   ActionTypes.CLIENT_LAW_DELETE,
//   props<{ id: string | undefined }>()
// );


// export const trustedPersoneDeleteSuccessAction = createAction(
//   ActionTypes.CLIENT_LAW_DELETE_SUCCES,
//   props<{ data: string }>()
// );


// export const trustedPersoneDeleteFailureAction = createAction(
//   ActionTypes.CLIENT_LAW_DELETE_FAILURE,
//   props<{ errors: any }>()
// );








// Update State trusred persone
// export const updateStateTrustedPersoneAction = createAction(
//   ActionTypes.UPDATE_STATE_CLIENTS_LAW,
// );


// export const updateStateTrustedPersoneSuccessAction = createAction(
//   ActionTypes.UPDATE_STATE_CLIENTS_LAW_SUCCES,
//   props<{ data: AppStateInterface }>()
// );


// export const updateStateTrustedPersoneFailureAction = createAction(
//   ActionTypes.UPDATE_STATE_CLIENTS_LAW_FAILURE,
//   props<{ errors: any }>()
// );







// Get trusred persone Current
// export const trustedPersoneGetCurrent = createAction(
//   ActionTypes.CLIENT_LAW_GET_CURRENT,
//   props<{ id: string }>()
// );


// export const trustedPersoneGetCurrentSuccessAction = createAction(
//   ActionTypes.CLIENT_LAW_GET_CURRENT_SUCCES,
//   props<{ data: ClientLaw }>()
// );


// export const trustedPersoneGetCurrentFailureAction = createAction(
//   ActionTypes.CLIENT_LAW_GET_CURRENT_FAILURE,
//   props<{ errors: any }>()
// );

// export const trustedPersoneGetCurrentReset = createAction(
//   ActionTypes.CLIENT_LAW_GET_CURRENT_RESET,
// );










// Update trusred persone
// export const updateTrustedPersoneAction = createAction(
//   ActionTypes.UPDATE_CLIENT_LAW,
//   props<{ clientLaw: ClientLaw, files?:Array<File> }>()
// )


// export const updateTrustedPersoneSuccessAction = createAction(
//   ActionTypes.UPDATE_CLIENT_LAW_SUCCESS,
//   props<{ data: ClientLaw }>()
// );




// export const updateTrustedPersoneFailureAction = createAction(
//   ActionTypes.UPDATE_CLIENT_LAW_FAILURE,
//   props<{ errors: any }>()
// )

