import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ClientLaw, ClientLawDogovorsParamsFetch, ClientsLawParamsFetch, Dogovor } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';
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
  props<{ clientLaw: ClientLaw, file_1?: File, file_2?: File, file_3?: File, file_4?: File }>()
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