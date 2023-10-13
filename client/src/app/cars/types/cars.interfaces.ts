

export interface Car {
    marka: string,
    model: string,
    number: string,
    probeg: string,
    transmission: string,
    start_arenda: string,
    end_arenda: string,
    vladelec: string,
    category: string,
    status: string,
    sts_seria: string,
    sts_number: string,
    sts_date: string,
    osago_seria: string,
    osago_number: string,
    osago_date_finish: string,
    vin: string,
    kuzov_number: string,
    color: string,
    year_production: string,
    price_ocenka: string,
    to_date: string,
    to_probeg_prev: string,
    to_probeg_next: string,
    to_interval: string,
    oil_name: string,
    stoa_name: string,
    stoa_phone: string,
    userId: string | undefined
}



// Интерфейс для state cars
export interface CarsStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    carsList?: Car[] | null | undefined,
    noMoreCarsList: boolean
    currentCar: Car | null | undefined,
}




// Интерфейс для параметров запроса на получение всех смен
export interface CarsParamsFetch {
    offset: number | null,
    limit: number | null
}