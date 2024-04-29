import { Act, Booking } from "src/app/bookings/types/bookings.interfaces";



//Интерфейс для клиента физ/лицо
export interface ClientFiz {
    _id?: string,
    type: string,
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
    resident?: string,
    phone_1: string,
    phone_2_dop_name?: string,
    phone_2_dop_number?: string,
    phone_3_dop_name?: string,
    phone_3_dop_number?: string,
    phone_4_dop_name?: string,
    phone_4_dop_number?: string,
    phone_5_dop_name?: string,
    phone_5_dop_number?: string,
    files?: Array<any>,
    date?: string ,
    dogovor_active?: string
}




// Интерфейс для state clients
export interface ClientFizStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    clientsFizList?: ClientFiz[] | null | undefined | any,
    noMoreClientsFizList: boolean,
    noMoreClientsFizDogovorsList: boolean,
    currentClientFiz: ClientFiz | null | undefined | any,
    dogovorsList: Dogovor[] | null | undefined | any,
    currentDogovorClientFiz: Dogovor | null | undefined | any,
    searchList?: ClientFiz[] | null | undefined | any,
    actsFizList: Act[] | null | undefined | any,
    noMoreActsFizList: boolean,
    bookingsFizList: Booking[] | null | undefined | any,
    from: string | undefined
}




// Интерфейс для клиентов запроса на получение всех партнеров
export interface ClientsFizParamsFetch {
    offset: number | null,
    limit: number | null,
    
}




// Интерфейс для договора
export interface Dogovor {
    _id?: string;
    date_start: string;
    dogovor_number: string;
    date_end: string | null | undefined;
    client: string | null | undefined;
    administrator: string | null | undefined;
    content: string;
    state: string;
    date?: string;
}




// Интерфейс для клиентов запроса на получение всех договоров
export interface ClientFizDogovorsParamsFetch {
    offset: number | null,
    limit: number | null,
    clientId?: string | null
}
