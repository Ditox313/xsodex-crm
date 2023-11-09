

//Интерфейс для партнера
export interface Partner {
    name: string
    surname: string
    lastname: string
    passport_seria: string
    passport_number: string
    passport_date: string
    passport_who_take: string
    code_podrazdeleniya: string
    passport_register: string
    phone_main: string
    file_1?: string
    file_2?: string
    _id?: string
}



// Интерфейс для state cars
// export interface CarsStateInterface {
//     isLoading: boolean,
//     validationErrors?: any,
//     carsList?: Car[] | null | undefined,
//     noMoreCarsList: boolean
//     currentCar: Car | null | undefined,
// }




// Интерфейс для параметров запроса на получение всех смен
// export interface CarsParamsFetch {
//     offset: number | null,
//     limit: number | null
// }