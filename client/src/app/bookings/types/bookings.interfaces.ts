

//Интерфейс для брони
export interface Booking {
    _id?: string
}

//Интерфейс для объекта данных брони 
export interface BookingData {
    booking_start: string,
    booking_end: string,
    booking_days: number,
    dop_hours: number
}



// Интерфейс для state bookings
export interface BookingsStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    bookingsList?: Booking[] | null | undefined | any,
    noMoreBookingsList: boolean
    currentBooking: Booking | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех броней
export interface BookingsParamsFetch {
    offset: number | null,
    limit: number | null
}