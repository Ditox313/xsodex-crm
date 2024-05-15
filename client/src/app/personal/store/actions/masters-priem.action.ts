import {createAction, props} from '@ngrx/store'
import { AppStateInterface } from 'src/app/shared/types/interfaces';
import { ActionTypes } from '../actionTypes';
import { MasterPriem, MastersPriemParamsFetch } from '../../types/masters-priem.interfaces';


// Add master-priem
export const addMasterPriemAction = createAction(
  ActionTypes.ADD_MASTER_PRIEM,
  props<{ masterPriem: MasterPriem, files?:Array<File>}>()
);

export const addMasterPriemSuccessAction = createAction(
  ActionTypes.ADD_MASTER_PRIEM_SUCCESS,
  props<{ masterPriem: MasterPriem }>()
);


export const addMasterPriemFailureAction = createAction(
  ActionTypes.ADD_MASTER_PRIEM_FAILURE,
  props<{ errors: any }>()
);








// MastersPriem List
export const mastersPriemListAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST,
  props<{ params?: MastersPriemParamsFetch  }>()
);


export const mastersPriemListSuccessAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_SUCCES,
  props<{ data: MasterPriem[] }>()
);


export const mastersPriemListFailureAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_FAILURE,
  props<{ errors: any }>()
);


export const mastersPriemListResetAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_RESET,
);









// No more MastersPriem List

export const noMoreMastersPriemListAction = createAction(
  ActionTypes.NO_MORE_MASTERS_PRIEM_LIST,
  props<{ data: boolean }>()
);

export const noMoreMastersPriemListFalseAction = createAction(
  ActionTypes.NO_MORE_MASTERS_PRIEM_LIST_FALSE,
);

export const noMoreMastersPriemListTrueAction = createAction(
  ActionTypes.NO_MORE_MASTERS_PRIEM_LIST_TRUE,
);












// Master-priem delete
export const masterPriemDeleteAction = createAction(
  ActionTypes.MASTER_PRIEM_DELETE,
  props<{ id: string | undefined }>()
);


export const masterPriemDeleteSuccessAction = createAction(
  ActionTypes.MASTER_PRIEM_DELETE_SUCCES,
  props<{ data: string }>()
);


export const masterPriemDeleteFailureAction = createAction(
  ActionTypes.MASTER_PRIEM_DELETE_FAILURE,
  props<{ errors: any }>()
);








// Update State MastersPriem
export const updateStateMastersPriemAction = createAction(
  ActionTypes.UPDATE_STATE_MASTERS_PRIEM,
);


export const updateStateMastersPriemSuccessAction = createAction(
  ActionTypes.UPDATE_STATE_MASTERS_PRIEM_SUCCES,
  props<{ data: AppStateInterface }>()
);


export const updateStateMastersPriemFailureAction = createAction(
  ActionTypes.UPDATE_STATE_MASTERS_PRIEM_FAILURE,
  props<{ errors: any }>()
);










// Get MasterPriem Current
export const masterPriemGetCurrent = createAction(
  ActionTypes.MASTER_PRIEM_GET_CURRENT,
  props<{ id: string }>()
);


export const masterPriemGetCurrentSuccessAction = createAction(
  ActionTypes.MASTER_PRIEM_GET_CURRENT_SUCCES,
  props<{ data: MasterPriem }>()
);


export const masterPriemGetCurrentFailureAction = createAction(
  ActionTypes.MASTER_PRIEM_GET_CURRENT_FAILURE,
  props<{ errors: any }>()
);

export const masterPriemGetCurrentReset = createAction(
  ActionTypes.MASTER_PRIEM_GET_CURRENT_FAILURE,
);








// Update MasterPriem 
export const updateMasterPriemAction = createAction(
  ActionTypes.UPDATE_MASTER_PRIEM,
  props<{ partner: MasterPriem, files?:Array<File>}>()
)



export const updateMasterPriemSuccessAction = createAction(
  ActionTypes.UPDATE_MASTER_PRIEM_SUCCESS,
  props<{ data: MasterPriem }>()
);




export const updateMasterPriemFailureAction = createAction(
  ActionTypes.UPDATE_MASTER_PRIEM_FAILURE,
  props<{ errors: any }>()
)






// MastersPriem List no params
export const mastersPriemListNoParamsAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_NO_PARAMS,
);


export const mastersPriemListNoParamsSuccessAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_NO_PARAMS_SUCCES,
  props<{ data: MasterPriem[] }>()
);


export const mastersPriemListNoParamsFailureAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_NO_PARAMS_FAILURE,
  props<{ errors: any }>()
);


export const mastersPriemListNoParamsResetAction = createAction(
  ActionTypes.MASTERS_PRIEM_LIST_NO_PARAMS_RESET,
);
export { ActionTypes };

