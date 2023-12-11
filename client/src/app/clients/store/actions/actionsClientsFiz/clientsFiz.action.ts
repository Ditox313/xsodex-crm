import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../../actionTypes/clientsFiz/actionTypesClientsFiz';
import { ClientFiz, ClientFizDogovorsParamsFetch, ClientsFizParamsFetch, Dogovor } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';



// Add clientFiz
export const addClientFizAction = createAction(
  ActionTypes.ADD_CLIENT_FIZ,
    props<{ clientFiz: ClientFiz, file_1?: File, file_2?: File, file_3?: File, file_4?: File }>()
);

export const addClientFizSuccessAction = createAction(
  ActionTypes.ADD_CLIENT_FIZ_SUCCESS,
  props<{ clientFiz: ClientFiz }>()
);


export const addClientFizFailureAction = createAction(
  ActionTypes.ADD_CLIENT_FIZ_FAILURE,
  props<{ errors: any }>()
);








// ClientsFiz List
export const clientsFizListAction = createAction(
  ActionTypes.CLIENTS_FIZ_LIST,
  props<{ params: ClientsFizParamsFetch }>()
);


export const clientsFizListSuccessAction = createAction(
  ActionTypes.CLIENTS_FIZ_LIST_SUCCES,
  props<{ data: ClientFiz[] }>()
);


export const clientsFizListFailureAction = createAction(
  ActionTypes.CLIENTS_FIZ_LIST_FAILURE,
  props<{ errors: any }>()
);


export const clientsFizListResetAction = createAction(
  ActionTypes.CLIENTS_FIZ_LIST_RESET,
);





// No more ClientsFiz List

export const noMoreClientsFizListAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FIZ_LIST,
  props<{ data: boolean }>()
);

export const noMoreClientsFizListFalseAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FIZ_LIST_FALSE,
);

export const noMoreClientsFizListTrueAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FIZ_LIST_TRUE,
);






// ClientFiz delete
export const clientFizDeleteAction = createAction(
  ActionTypes.CLIENT_FIZ_DELETE,
  props<{ id: string | undefined }>()
);


export const clientFizDeleteSuccessAction = createAction(
  ActionTypes.CLIENT_FIZ_DELETE_SUCCES,
  props<{ data: string }>()
);


export const clientFizDeleteFailureAction = createAction(
  ActionTypes.CLIENT_FIZ_DELETE_FAILURE,
  props<{ errors: any }>()
);








// Update State ClientsFiz
export const updateStateClientsFizAction = createAction(
  ActionTypes.UPDATE_STATE_CLIENTS_FIZ,
);


export const updateStateClientsFizSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_CLIENTS_FIZ_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStateClientsFizFailureAction = createAction(
  ActionTypes.UPDATE_STATE_CLIENTS_FIZ_FAILURE,
  props<{ errors: any }>()
);







// Get ClientFiz Current
export const clientFizGetCurrent = createAction(
  ActionTypes.CLIENT_FIZ_GET_CURRENT,
  props<{ id: string }>()
);


export const clientFizGetCurrentSuccessAction = createAction(
  ActionTypes.CLIENT_FIZ_GET_CURRENT_SUCCES,
  props<{ data: ClientFiz }>()
);


export const clientFizGetCurrentFailureAction = createAction(
  ActionTypes.CLIENT_FIZ_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const clientFizGetCurrentReset = createAction(
  ActionTypes.CLIENT_FIZ_GET_CURRENT_RESET,
);










// Update ClientFiz
export const updateClientFizAction = createAction(
  ActionTypes.UPDATE_CLIENT_FIZ,
  props<{ clientFiz: ClientFiz, file_1?: File, file_2?: File, file_3?: File, file_4?: File }>()
)


export const updateClientFizSuccessAction = createAction(
  ActionTypes.UPDATE_CLIENT_FIZ_SUCCESS,
  props<{ data: ClientFiz }>()
);




export const updateClientFizFailureAction = createAction(
  ActionTypes.UPDATE_CLIENT_FIZ_FAILURE,
  props<{ errors: any }>()
)





// Создать договор
export const addClientFizDogovorAction = createAction(
  ActionTypes.ADD_CLIENT_FIZ_DOGOVOR,
  props<{ dogovor: Dogovor }>()
);

export const addClientFizDogovorSuccessAction = createAction(
  ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_SUCCESS,
);


export const addClientFizDogovorFailureAction = createAction(
  ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_FAILURE,
  props<{ errors: any }>()
);





// Создать договор из брони
export const addClientFizDogovorActionFromBooking = createAction(
  ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_FROM_BOOKING,
  props<{ dogovor: Dogovor }>()
);

export const addClientFizDogovorSuccessActionFromBooking = createAction(
  ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_SUCCESS_FROM_BOOKING,
);


export const addClientFizDogovorFailureActionFromBooking = createAction(
  ActionTypes.ADD_CLIENT_FIZ_DOGOVOR_FAILURE_FROM_BOOKING,
  props<{ errors: any }>()
);










// ClientsFiz Dogovors List
export const clientFizDogovorsListAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVORS_LIST,
  props<{ params: ClientFizDogovorsParamsFetch }>()
);


export const clientFizDogovorsListSuccessAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVORS_LIST_SUCCES,
  props<{ data: Dogovor[] }>()
);


export const clientFizDogovorsListFailureAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVORS_LIST_FAILURE,
  props<{ errors: any }>()
);


export const clientFizDogovorsListResetAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVORS_LIST_RESET,
);






// No more ClientsFiz Dogovors List
export const noMoreClientFizDogovorsListAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FIZ_LIST,
  props<{ data: boolean }>()
);

export const noMoreClientFizDogovorsListFalseAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FIZ_LIST_FALSE,
);

export const noMoreClientFizDogovorsListTrueAction = createAction(
  ActionTypes.NO_MORE_CLIENTS_FIZ_LIST_TRUE,
);





// Delete dogovor
export const clientFizDogovorDeleteAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_DELETE,
  props<{ id: string | undefined }>()
);


export const clientFizDogovorDeleteSuccessAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_DELETE_SUCCES,
  props<{ data: string }>()
);


export const clientFizDogovorDeleteFailureAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_DELETE_FAILURE,
  props<{ errors: any }>()
);






// Get ClientFiz Dogovor Current
export const clientFizDogovorGetCurrent = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT,
  props<{ id: string }>()
);


export const clientFizDogovorGetCurrentSuccessAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT_SUCCES,
  props<{ data: Dogovor }>()
);


export const clientFizDogovorGetCurrentFailureAction = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const clientFizDogovorGetCurrentReset = createAction(
  ActionTypes.CLIENT_FIZ_DOGOVOR_GET_CURRENT_RESET,
);






// Поиск
export const clientsFizSearchAction = createAction(
  ActionTypes.CLIENTS_SEARCH,
  props<{ data: any }>()
);


export const clientsFizSearchSuccessAction = createAction(
  ActionTypes.CLIENTS_SEARCH_SUCCES,
  props<{ data: ClientFiz[] }>()
);


export const clientsFizSearchFailureAction = createAction(
  ActionTypes.CLIENTS_SEARCH_FAILURE,
  props<{ errors: any }>()
);


export const clientsFizSearchResetAction = createAction(
  ActionTypes.CLIENTS_SEARCH_RESET,
);