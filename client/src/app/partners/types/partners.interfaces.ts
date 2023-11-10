

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
    phone_1: string
    phone_2: string
    file_1?: string
    file_2?: string
    _id?: string
}



// Интерфейс для state partners
export interface PartnersStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    partnersList?: Partner[] | null | undefined | any,
    noMorePartnersList: boolean
    currentPartner: Partner | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех смен
// export interface CarsParamsFetch {
//     offset: number | null,
//     limit: number | null
// }