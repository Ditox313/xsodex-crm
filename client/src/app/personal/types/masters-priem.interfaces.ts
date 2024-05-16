

//Интерфейс для мастера приемщика
export interface MasterPriem {
    name: string
    surname: string
    lastname: string
    phone: string
    doverenostNumber: string
    doverenostDate: string
    _id?: string
}



// Интерфейс для state мастера приемщика
export interface MastersPriemStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    mastersPriemList?: MasterPriem[] | null | undefined | any,
    noMoreMastersPriemList: boolean
    currentMasterPriem: MasterPriem | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех партнеров
export interface MastersPriemParamsFetch {
    offset: number | null,
    limit: number | null
}



// Интерфейс для загрузки файла
export interface UploadResponse {
    offset: number | null,
    limit: number | null
}

