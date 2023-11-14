import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../../actionTypes/clientsFiz/actionTypesClientsFiz';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';



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








// Partners List
// export const partnersListAction = createAction(
//   ActionTypes.PARTNERS_LIST,
//   props<{ params: PartnersParamsFetch }>()
// );


// export const partnersListSuccessAction = createAction(
//   ActionTypes.PARTNERS_LIST_SUCCES,
//   props<{ data: Partner[] }>()
// );


// export const partnersListFailureAction = createAction(
//   ActionTypes.PARTNERS_LIST_FAILURE,
//   props<{ errors: any }>()
// );


// export const partnersListResetAction = createAction(
//   ActionTypes.PARTNERS_LIST_RESET,
// );





// No more Partners List

// export const noMorePartnersListAction = createAction(
//   ActionTypes.NO_MORE_PARTNERS_LIST,
//   props<{ data: boolean }>()
// );

// export const noMorePartnersListFalseAction = createAction(
//   ActionTypes.NO_MORE_PARTNERS_LIST_FALSE,
// );

// export const noMorePartnersListTrueAction = createAction(
//   ActionTypes.NO_MORE_PARTNERS_LIST_TRUE,
// );






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
// export const updateStatePartnersAction = createAction(
//   ActionTypes.UPDATE_STATE_PARTNERS,
// );


// export const updateStatePartnersSuccessAction = createAction(
//   ActionTypes.UPDATE_STATE_PARTNERS_SUCCES,
//   props<{ data: AppStateInterface }>()
// );


// export const updateStatePartnersFailureAction = createAction(
//   ActionTypes.UPDATE_STATE_PARTNERS_FAILURE,
//   props<{ errors: any }>()
// );







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
