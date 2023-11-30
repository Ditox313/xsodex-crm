

//Интерфейс для брони
export interface Booking {
    _id?: string
}



// Интерфейс для state bookings
export interface PartnersStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    bookinhsList?: Booking[] | null | undefined | any,
    noMoreBookingsList: boolean
    currentBooking: Booking | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех броней
export interface BookingsParamsFetch {
    offset: number | null,
    limit: number | null
}