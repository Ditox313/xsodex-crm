

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
    files?: Array<any>,
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




// Интерфейс для параметров запроса на получение всех партнеров
export interface PartnersParamsFetch {
    offset: number | null,
    limit: number | null
}



// Интерфейс для загрузки файла
export interface UploadResponse {
    offset: number | null,
    limit: number | null
}

