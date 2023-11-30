import {createReducer, on, Action} from '@ngrx/store'
import { BookingsStateInterface } from '../types/bookings.interfaces';
import { bookingsListAction, bookingsListFailureAction, bookingsListResetAction, bookingsListSuccessAction, noMoreBookingsListAction, noMoreBookingsListFalseAction, noMoreBookingsListTrueAction, updateStateBookingsFailureAction, updateStateBookingsSuccessAction } from './actions/bookings.action';





// Инициализируем состояние
const initialState: BookingsStateInterface = {
  isLoading: false,
  validationErrors: null,
  bookingsList: null,
  noMoreBookingsList: true,
  currentBooking: null
};




// Создаем редьюсер
const bookingsReducer = createReducer(
  initialState,
  // on(
  //   addPartnerAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true,
  //   })
  // ),

  // on(
  //   addPartnerSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   addPartnerFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),










  on(
    bookingsListAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    bookingsListSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      bookingsList: state.bookingsList ? [...state.bookingsList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    bookingsListFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    bookingsListResetAction,
    (state): BookingsStateInterface => ({
      ...state,
      bookingsList: null,
    })
  ),
  on(
    noMoreBookingsListAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      noMoreBookingsList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreBookingsListFalseAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      noMoreBookingsList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreBookingsListTrueAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      noMoreBookingsList: true,
      isLoading: false,
    })
  ),








  // on(
  //   partnersListNoParamsAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnersListNoParamsSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     partnersList: action.data,
  //     isLoading: false,
  //     validationErrors: null,
  //   })
  // ),
  // on(
  //   partnersListNoParamsFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnersListNoParamsResetAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     partnersList: null,
  //   })
  // ),








  // on(
  //   partnerDeleteAction,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnerDeleteSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentPartner: null,
  //     partnersList: state.partnersList ? state.partnersList.filter((item: { _id: string; }) => item._id !== action.data) : state.partnersList,
  //   })
  // ),
  // on(
  //   partnerDeleteFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //     currentPartner: null,
  //   })
  // ),








  on(
    updateStateBookingsSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      isLoading: action.data.bookings.isLoading,
      validationErrors: action.data.bookings.validationErrors,
      bookingsList: action.data.bookings.bookingsList ,
      noMoreBookingsList: action.data.bookings.noMoreBookingsList,
      currentBooking: action.data.bookings.currentBooking
    }),
  ),
  on(
    updateStateBookingsFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),







  // on(
  //   partnerGetCurrent,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: null,
  //     isLoading: true
  //   })
  // ),

  // on(
  //   partnerGetCurrentSuccessAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     isLoading: false,
  //     validationErrors: null,
  //     currentPartner: action.data
  //   })
  // ),
  // on(
  //   partnerGetCurrentFailureAction,
  //   (state, action): PartnersStateInterface => ({
  //     ...state,
  //     validationErrors: action.errors,
  //     isLoading: false,
  //   })
  // ),
  // on(
  //   partnerGetCurrentReset,
  //   (state): PartnersStateInterface => ({
  //     ...state,
  //     currentPartner: null
  //   })
  // ),

);





// Экспортируем Reducer
export function reducers(state: BookingsStateInterface, action: Action) {
  return bookingsReducer(state, action)
}
