import { Pay } from "src/app/bookings/types/bookings.interfaces"


// Интерфейс для Smena
export interface Smena {
    _id?: string,
    order?: number,
    open_date: string,
    responsible_name: string,
    responsible_secondName: string,
    responsible_lastName: string,
    status: string,
    close_date: string,
    userId: string 
    date?: string
}



// Интерфейс для state smena
export interface SmenaStateInterface {
    isOpenedSmena?: Smena | null | undefined,
    isLoading: boolean,
    validationErrors?: any,
    smenaList?: Smena[] | null | undefined,
    paysList?: Pay[] | null | undefined,
    paysListForGeneralReport?: Pay[] | null | undefined,
    noMoreSmenaList: boolean
    currentSmena: Smena | null | undefined,
}




// Интерфейс для параметров запроса на получение всех смен
export interface SmenaParamsFetch {
    offset: number | null,
    limit: number | null
}