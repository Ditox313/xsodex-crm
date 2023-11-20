

//Интерфейс для клиента Юр/лицо
export interface ClientLaw {
    _id?: string,
    name: string
    short_name: string
    inn: string
    kpp: string
    ogrn?: string
    ogrn_ip?: string
    svidetelstvo_ip?: string
    law_address: string
    fact_address: string
    mail_address: string
    boss_role: string
    boss_name: string
    boss_surname: string
    boss_lastname: string
    osnovanie_boss_role: string
    phone_1: string
    phone_2: string
    email: string
    rc_number: string
    kor_rc_number: string
    bik_number: string
    name_bank: string
    file_1?: string
    file_2?: string
    file_3?: string
    file_4?: string
    date?: string
}




// Интерфейс для state clients
export interface ClientLawStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    clientsLawList?: ClientLaw[] | null | undefined | any,
    noMoreClientsLawList: boolean,
    noMoreClientsLawDogovorsList: boolean,
    currentClientLaw: ClientLaw | null | undefined | any,
    dogovorsList: Dogovor | null | undefined | any
    currentDogovorClientLaw: Dogovor | null | undefined | any,
    searchList?: ClientLaw[] | null | undefined | any,
}




// Интерфейс для клиентов запроса на получение всех партнеров
export interface ClientsLawParamsFetch {
    offset: number | null,
    limit: number | null
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
export interface ClientLawDogovorsParamsFetch {
    offset: number | null,
    limit: number | null,
    clientId?: string | null
}





