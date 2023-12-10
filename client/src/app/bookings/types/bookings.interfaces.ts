import { Car } from "src/app/cars/types/cars.interfaces"


//Интерфейс для брони
export interface Booking {
    _id?: string,
    booking_start: string,
    booking_end: string,
    booking_days: Number,
    car: Object | undefined,
    tarif: Object,
    tarifCheked: string,
    zalog: Number,
    client: Object,
    place_start: string,
    place_start_price: Number,
    place_end: string,
    place_end_price: Number,
    arenda: Number,
    custome_place_start: boolean,
    custome_place_end: boolean,
    custome_zalog: boolean,
    additional_services: Object,
    additional_services_price: number,
    smenaId: string | undefined,
    summaFull: number,
    paidCount: number,
    comment?: string,
    status: string,
    sale: Number,
    userId: string | undefined,
    order?: Number,
    date?: string
}

//Интерфейс для объекта данных брони 
export interface BookingData {
    booking_start: string,
    booking_end: string,
    car: Car | null,
    tarif: Array<any>,
    arenda: number,
    zalog: number,
    custome_zalog: boolean,
    place_start: string,
    place_start_price: number,
    place_end: string,
    place_end_price: number,
    custome_place_start: boolean,
    custome_place_end: boolean,
    additional_services: Array<any>,
    additional_services_price: number,
    tarifCheked: string
}



// Интерфейс для state bookings
export interface BookingsStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    bookingsList?: Booking[] | null | undefined | any,
    noMoreBookingsList: boolean
    currentBooking: Booking | null | undefined | any,
    clients?: any[] | null | undefined | any,
    currentClient: any,
    noMoreClientsList: boolean,
    searchList: any[] | null
}




// Интерфейс для параметров запроса на получение всех броней
export interface BookingsParamsFetch {
    offset: number | null,
    limit: number | null
}