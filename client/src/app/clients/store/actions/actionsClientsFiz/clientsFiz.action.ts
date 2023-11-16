import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../../actionTypes/clientsFiz/actionTypesClientsFiz';
import { ClientFiz, ClientsFizParamsFetch } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';



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










// Update Partner
// export const updatePartnerAction = createAction(
//   ActionTypes.UPDATE_PARTNER,
//   props<{ partner: Partner, file_1?: File, file_2?: File }>()
// )


// export const updatePartnerSuccessAction = createAction(
//   ActionTypes.UPDATE_PARTNER_SUCCESS,
//   props<{ data: Partner }>()
// );




// export const updatePARTNERFailureAction = createAction(
//   ActionTypes.UPDATE_PARTNER_FAILURE,
//   props<{ errors: any }>()
// )
