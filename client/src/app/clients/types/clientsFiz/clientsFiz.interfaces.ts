


//Интерфейс для клиента физ/лицо
export interface ClientFiz {
    _id?: string,
    name: string,
    surname: string,
    lastname: string,
    date_birth: string,
    passport_seria: string,
    passport_number: string,
    passport_date: string,
    passport_who_take: string,
    code_podrazdeleniya: string,
    passport_register: string,
    passport_address_fact?: string,
    prava_seria: string,
    prava_number: string,
    prava_date: string,
    phone_main: string,
    resident?: boolean,
    phone_1_dop_name?: string,
    phone_1_dop_number?: string,
    phone_2_dop_name?: string,
    phone_2_dop_number?: string,
    phone_3_dop_name?: string,
    phone_3_dop_number?: string,
    phone_4_dop_name?: string,
    phone_4_dop_number?: string,
    file_1?: string,
    file_2?: string,
    file_3?: string,
    file_4?: string,
    date?: string 
}




// Интерфейс для state clients
export interface ClientFizStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    clientsFizList?: ClientFiz[] | null | undefined | any,
    noMoreClientsFizList: boolean
    currentClientFiz: ClientFiz | null | undefined | any,
}




// Интерфейс для клиентов запроса на получение всех партнеров
export interface ClientsFizParamsFetch {
    offset: number | null,
    limit: number | null
}