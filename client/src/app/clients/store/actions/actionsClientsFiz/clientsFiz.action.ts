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




// export const updatePARTNERFailureAction = createAction(
//   ActionTypes.UPDATE_PARTNER_FAILURE,
//   props<{ errors: any }>()
// )
