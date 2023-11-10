import {createReducer, on, Action} from '@ngrx/store'
import { PartnersStateInterface } from '../types/partners.interfaces';
import { addPartnerAction, addPartnerFailureAction, addPartnerSuccessAction, updateStatePartnersFailureAction, updateStatePartnersSuccessAction } from './actions/partners.action';





// Инициализируем состояние
const initialState: PartnersStateInterface = {
  isLoading: false,
  validationErrors: null,
  partnersList: null,
  noMorePartnersList: true,
  currentPartner: null
};




// Создаем редьюсер
const partnersReducer = createReducer(
  initialState,
  on(
    addPartnerAction,
    (state): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addPartnerSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addPartnerFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










  // on(
  //   carsListAction,
  //   (state): CarsStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   carsListSuccessAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     carsList: state.carsList ? [...state.carsList, ...action.data] : action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   carsListFailureAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   carsListResetAction,
  //   (state): CarsStateInterface => ({
  //     ...state,
  //     carsList: null,
  //   })
  // ),
  // on(
  //   noMoreCarsListAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     noMoreCarsList: action.data,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreCarsListFalseAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     noMoreCarsList: false,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   noMoreCarsListAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     noMoreCarsList: true,
  //     isLoading: false,
  //   })
  // ),








  // on(
  //   carDeleteAction,
  //   (state): CarsStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   carDeleteSuccessAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentCar: null,
  //     carsList: state.carsList ? state.carsList.filter((item) => item._id !== action.data) : state.carsList,
  //   })
  // ),
  // on(
  //   carDeleteFailureAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //     currentCar: null,
  //   })
  // ),








  on(
    updateStatePartnersSuccessAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      isLoading: action.data.cars.isLoading,
      validationErrors: action.data.cars.validationErrors,
      partnersList: action.data.cars.carsList ,
      noMorePartnersList: action.data.cars.noMoreCarsList,
      currentPartner: action.data.cars.currentCar
    }),
  ),
  on(
    updateStatePartnersFailureAction,
    (state, action): PartnersStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  // on(
  //   carGetCurrent,
  //   (state): CarsStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   carGetCurrentSuccessAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentCar: action.data
  //   })
  // ),
  // on(
  //   carGetCurrentFailureAction,
  //   (state, action): CarsStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   carGetCurrentReset,
  //   (state): CarsStateInterface => ({
  //     ...state,
  //     currentCar: null
  //   })
  // ),

);





// Экспортируем Reducer
export function reducers(state: PartnersStateInterface, action: Action) {
  return partnersReducer(state, action)
}
