import {createReducer, on, Action} from '@ngrx/store'
import { BookingsStateInterface } from '../types/bookings.interfaces';
import { addBookingAction, addBookingFailureAction, addBookingSuccessAction, bookingDeleteAction, bookingDeleteFailureAction, bookingDeleteSuccessAction, bookingsListAction, bookingsListFailureAction, bookingsListResetAction, bookingsListSuccessAction, changeCleintForBookingAction, changeCleintForBookingResetAction, clientsForSearchListAction, clientsForSearchListFailureAction, clientsForSearchListResetAction, clientsForSearchListSuccessAction, clientsSearchAction, clientsSearchFailureAction, clientsSearchResetAction, clientsSearchSuccessAction, noMoreBookingsListAction, noMoreBookingsListFalseAction, noMoreBookingsListTrueAction, noMoreClientsForSearchListAction, noMoreClientsForSearchListFalseAction, noMoreClientsForSearchListTrueAction, updateStateBookingsFailureAction, updateStateBookingsSuccessAction } from './actions/bookings.action';





// Инициализируем состояние
const initialState: BookingsStateInterface = {
  isLoading: false,
  validationErrors: null,
  bookingsList: null,
  noMoreBookingsList: true,
  currentBooking: null,
  currentClient: null,
  clients: null,
  noMoreClientsList: true,
  searchList: null
};




// Создаем редьюсер
const bookingsReducer = createReducer(
  initialState,
  on(
    addBookingAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    addBookingSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
    })
  ),
  on(
    addBookingFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),










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












  on(
    clientsForSearchListAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientsForSearchListSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      clients: state.clients ? [...state.clients, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    clientsForSearchListFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientsForSearchListResetAction,
    (state): BookingsStateInterface => ({
      ...state,
      clients: null,
    })
  ),
  on(
    noMoreClientsForSearchListAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      noMoreClientsList: action.data,
      isLoading: false,
    })
  ),
  on(
    noMoreClientsForSearchListFalseAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      noMoreClientsList: false,
      isLoading: false,
    })
  ),
  on(
    noMoreClientsForSearchListTrueAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      noMoreClientsList: true,
      isLoading: false,
    })
  ),









  on(
    bookingDeleteAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    bookingDeleteSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      bookingsList: state.bookingsList ? state.bookingsList.filter((item: { _id: string; }) => item._id !== action.data) : state.bookingsList,
    })
  ),
  on(
    bookingDeleteFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),








  on(
    updateStateBookingsSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      isLoading: action.data.bookings.isLoading,
      validationErrors: action.data.bookings.validationErrors,
      bookingsList: action.data.bookings.bookingsList ,
      noMoreBookingsList: action.data.bookings.noMoreBookingsList,
      currentBooking: action.data.bookings.currentBooking,
      currentClient: action.data.bookings.currentClient,
      clients: action.data.bookings.clients,
      searchList: action.data.bookings.searchList,
    }),
  ),
  on(
    updateStateBookingsFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
    })
  ),






  on(
    clientsSearchAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    clientsSearchSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      searchList: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    clientsSearchFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    clientsSearchResetAction,
    (state): BookingsStateInterface => ({
      ...state,
      searchList: null,
    })
  ),











  on(
    changeCleintForBookingAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      currentClient: action.client
    })
  ),

  on(
    changeCleintForBookingResetAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      currentClient: null
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
