import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/partners/store/actionTypes'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { Partner, PartnersParamsFetch } from '../../types/partners.interfaces';


// Add partner
export const addPartnerAction = createAction(
  ActionTypes.ADD_PARTNER,
  props<{ partner: Partner, files?:Array<File>}>()
);

export const addPartnerSuccessAction = createAction(
  ActionTypes.ADD_PARTNER_SUCCESS,
  props<{ partner: Partner }>()
);


export const addPartnerFailureAction = createAction(
  ActionTypes.ADD_PARTNER_FAILURE,
  props<{ errors: any }>()
);








// Partners List
export const partnersListAction = createAction(
  ActionTypes.PARTNERS_LIST,
  props<{ params?: PartnersParamsFetch  }>()
);


export const partnersListSuccessAction = createAction(
  ActionTypes.PARTNERS_LIST_SUCCES,
  props<{ data: Partner[] }>()
);


export const partnersListFailureAction = createAction(
  ActionTypes.PARTNERS_LIST_FAILURE,
  props<{ errors: any }>()
);


export const partnersListResetAction = createAction(
  ActionTypes.PARTNERS_LIST_RESET,
);





// No more Partners List

export const noMorePartnersListAction = createAction(
  ActionTypes.NO_MORE_PARTNERS_LIST,
  props<{ data: boolean }>()
);

export const noMorePartnersListFalseAction = createAction(
  ActionTypes.NO_MORE_PARTNERS_LIST_FALSE,
);

export const noMorePartnersListTrueAction = createAction(
  ActionTypes.NO_MORE_PARTNERS_LIST_TRUE,
);






// Partner delete
export const partnerDeleteAction = createAction(
  ActionTypes.PARTNER_DELETE,
  props<{ id: string | undefined }>()
);


export const partnerDeleteSuccessAction = createAction(
  ActionTypes.PARTNER_DELETE_SUCCES,
  props<{ data: string }>()
);


export const partnerDeleteFailureAction = createAction(
  ActionTypes.PARTNER_DELETE_FAILURE,
  props<{ errors: any }>()
);








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







// Get Partners Current
export const partnerGetCurrent = createAction(
  ActionTypes.PARTNER_GET_CURRENT,
  props<{ id: string }>()
);


export const partnerGetCurrentSuccessAction = createAction(
  ActionTypes.PARTNER_GET_CURRENT_SUCCES,
  props<{ data: Partner }>()
);


export const partnerGetCurrentFailureAction = createAction(
  ActionTypes.PARTNER_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const partnerGetCurrentReset = createAction(
  ActionTypes.PARTNER_GET_CURRENT_FAILURE,
);









export const updatePartnerAction = createAction(
  ActionTypes.UPDATE_PARTNER,
  props<{ partner: Partner, files?:Array<File>}>()
)



export const updatePartnerSuccessAction = createAction(
  ActionTypes.UPDATE_PARTNER_SUCCESS,
  props<{ data: Partner }>()
);




export const updatePartnerFailureAction = createAction(
  ActionTypes.UPDATE_PARTNER_FAILURE,
  props<{ errors: any }>()
)






// Partners List no params
export const partnersListNoParamsAction = createAction(
  ActionTypes.PARTNERS_LIST_NO_PARAMS,
);


export const partnersListNoParamsSuccessAction = createAction(
  ActionTypes.PARTNERS_LIST_NO_PARAMS_SUCCES,
  props<{ data: Partner[] }>()
);


export const partnersListNoParamsFailureAction = createAction(
  ActionTypes.PARTNERS_LIST_NO_PARAMS_FAILURE,
  props<{ errors: any }>()
);


export const partnersListNoParamsResetAction = createAction(
  ActionTypes.PARTNERS_LIST_NO_PARAMS_RESET,
);
export { ActionTypes };

