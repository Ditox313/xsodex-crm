import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ClientLaw, ClientsLawParamsFetch } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
import { ActionTypes } from '../../actionTypes/clientsLaw/actionTypesClientsLaw';



// Add clientFiz
export const addClientLawAction = createAction(
  ActionTypes.ADD_CLIENT_LAW,
    props<{ clientLaw: ClientLaw, file_1?: File, file_2?: File, file_3?: File, file_4?: File }>()
);

export const addClientLawSuccessAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_SUCCESS,
  props<{ clientLaw: ClientLaw }>()
);


export const addClientLawFailureAction = createAction(
  ActionTypes.ADD_CLIENT_LAW_FAILURE,
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







// Get ClientFiz Current
// export const clientFizGetCurrent = createAction(
//   ActionTypes.CLIENT_FIZ_GET_CURRENT,
//   props<{ id: string }>()
// );


// export const clientFizGetCurrentSuccessAction = createAction(
//   ActionTypes.CLIENT_FIZ_GET_CURRENT_SUCCES,
//   props<{ data: ClientFiz }>()
// );


// export const clientFizGetCurrentFailureAction = createAction(
//   ActionTypes.CLIENT_FIZ_GET_CURRENT_FAILURE,
//   props<{ errors: any }>()
// );

// export const clientFizGetCurrentReset = createAction(
//   ActionTypes.CLIENT_FIZ_GET_CURRENT_RESET,
// );










// Update ClientFiz
// export const updateClientFizAction = createAction(
//   ActionTypes.UPDATE_CLIENT_FIZ,
//   props<{ clientFiz: ClientFiz, file_1?: File, file_2?: File, file_3?: File, file_4?: File }>()
// )


// export const updateClientFizSuccessAction = createAction(
//   ActionTypes.UPDATE_CLIENT_FIZ_SUCCESS,
//   props<{ data: ClientFiz }>()
// );




// export const updateClientFizFailureAction = createAction(
//   ActionTypes.UPDATE_CLIENT_FIZ_FAILURE,
//   props<{ errors: any }>()
// )





// Создать договор
// export const addClientFizDogovorAction = createAction(
//   ActionTypes.ADD_CLIENT_FIZ_DOGOVOR,
//   props<{ dogovor: Dogovor }>()
// );

// export const addClientFizDogovorSuccessAction = createAction(
//   ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_SUCCESS,
// );


// export const addClientFizDogovorFailureAction = createAction(
//   ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_FAILURE,
//   props<{ errors: any }>()
// );





// ClientsFiz Dogovors List
// export const clientFizDogovorsListAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVORS_LIST,
//   props<{ params: ClientFizDogovorsParamsFetch }>()
// );


// export const clientFizDogovorsListSuccessAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVORS_LIST_SUCCES,
//   props<{ data: Dogovor[] }>()
// );


// export const clientFizDogovorsListFailureAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVORS_LIST_FAILURE,
//   props<{ errors: any }>()
// );


// export const clientFizDogovorsListResetAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVORS_LIST_RESET,
// );






// No more ClientsFiz Dogovors List
// export const noMoreClientFizDogovorsListAction = createAction(
//   ActionTypes.NO_MORE_CLIENTS_FIZ_LIST,
//   props<{ data: boolean }>()
// );

// export const noMoreClientFizDogovorsListFalseAction = createAction(
//   ActionTypes.NO_MORE_CLIENTS_FIZ_LIST_FALSE,
// );

// export const noMoreClientFizDogovorsListTrueAction = createAction(
//   ActionTypes.NO_MORE_CLIENTS_FIZ_LIST_TRUE,
// );





// Delete dogovor
// export const clientFizDogovorDeleteAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_DELETE,
//   props<{ id: string | undefined }>()
// );


// export const clientFizDogovorDeleteSuccessAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_DELETE_SUCCES,
//   props<{ data: string }>()
// );


// export const clientFizDogovorDeleteFailureAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_DELETE_FAILURE,
//   props<{ errors: any }>()
// );






// Get ClientFiz Dogovor Current
// export const clientFizDogovorGetCurrent = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT,
//   props<{ id: string }>()
// );


// export const clientFizDogovorGetCurrentSuccessAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT_SUCCES,
//   props<{ data: Dogovor }>()
// );


// export const clientFizDogovorGetCurrentFailureAction = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT_FAILURE,
//   props<{ errors: any }>()
// );

// export const clientFizDogovorGetCurrentReset = createAction(
//   ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT_RESET,
// );






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