

//Интерфейс для клиента
export interface ClientFiz {
    // name: string
    // surname: string
    // lastname: string
    // passport_seria: string
    // passport_number: string
    // passport_date: string
    // passport_who_take: string
    // code_podrazdeleniya: string
    // passport_register: string
    // phone_1: string
    // phone_2: string
    // file_1?: string
    // file_2?: string
    // _id?: string
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