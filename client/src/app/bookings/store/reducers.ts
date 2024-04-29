import {createReducer, on, Action} from '@ngrx/store'
import { BookingsStateInterface } from '../types/bookings.interfaces';
import { addBookingAction, addBookingFailureAction, addBookingSuccessAction, bookingCreatePayAction, bookingCreatePayFailureAction, bookingCreatePaySuccessAction, bookingDeleteAction, bookingDeleteFailureAction, bookingDeleteSuccessAction, bookingGetCurrent, bookingGetCurrentFailureAction, bookingGetCurrentReset, bookingGetCurrentSuccessAction, bookingsListAction, bookingsListFailureAction, bookingsListResetAction, bookingsListSuccessAction, changeCleintForBookingAction, changeCleintForBookingResetAction,clientsForSearchListAction, clientsForSearchListFailureAction, clientsForSearchListResetAction, clientsForSearchListSuccessAction, clientsSearchAction, clientsSearchFailureAction, clientsSearchResetAction, clientsSearchSuccessAction, currentActAction, currentActFailureAction, currentActResetAction, currentActSuccessAction, currentClientForActAction, currentClientForActFailureAction, currentClientForActResetAction, currentClientForActSuccessAction, noMoreBookingsListAction, noMoreBookingsListFalseAction, noMoreBookingsListTrueAction, noMoreClientsForSearchListAction, noMoreClientsForSearchListFalseAction, noMoreClientsForSearchListTrueAction, paysListAction, paysListFailureAction, paysListResetAction, paysListSuccessAction, toggleStatusBookingAction, toggleStatusFailureAction, toggleStatusSuccessAction, updateStateBookingsFailureAction, updateStateBookingsSuccessAction } from './actions/bookings.action';





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
  searchList: null,
  paysList: null,
  currentClientForAct: null,
  currentAct: null
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
      paysList: action.data.bookings.paysList,
      currentClientForAct: action.data.bookings.currentClientForAct,
      // clientsFiz: action.data.bookings.clientsFiz,
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












  on(
    bookingGetCurrent,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    bookingGetCurrentSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentBooking: action.data
    })
  ),
  on(
    bookingGetCurrentFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    bookingGetCurrentReset,
    (state): BookingsStateInterface => ({
      ...state,
      currentBooking: null
    })
  ),









  on(
    bookingCreatePayAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    bookingCreatePaySuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentBooking: action.data.actualBooking,
      paysList: action.data.paysList
    })
  ),
  on(
    bookingCreatePayFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),









  on(
    paysListAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    paysListSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      paysList: state.paysList ? [...state.paysList, ...action.data] : action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    paysListFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    paysListResetAction,
    (state): BookingsStateInterface => ({
      ...state,
      paysList: null,
    })
  ),








  on(
    currentClientForActAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    currentClientForActSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      currentClientForAct: action.data,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    currentClientForActFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    currentClientForActResetAction,
    (state): BookingsStateInterface => ({
      ...state,
      currentClientForAct: null,
    })
  ),












  on(
    toggleStatusBookingAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true,
    })
  ),

  on(
    toggleStatusSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: false,
      currentBooking: action.booking
    })
  ),
  on(
    toggleStatusFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),














  on(
    currentActAction,
    (state): BookingsStateInterface => ({
      ...state,
      validationErrors: null,
      isLoading: true
    })
  ),

  on(
    currentActSuccessAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      currentAct: action.act,
      isLoading: false,
      validationErrors: null,
    })
  ),
  on(
    currentActFailureAction,
    (state, action): BookingsStateInterface => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })
  ),
  on(
    currentActResetAction,
    (state): BookingsStateInterface => ({
      ...state,
      currentAct: null,
    })
  ),


);





// Экспортируем Reducer
export function reducers(state: BookingsStateInterface, action: Action) {
  return bookingsReducer(state, action)
}
