

// Интерфейс для Smena
export interface Smena {
    _id?: string,
    order?: string,
    open_date: string,
    responsible_name: string,
    responsible_secondName: string,
    responsible_lastName: string,
    status: string,
    close_date: string,
    userId: string 
}



// Интерфейс для state smena
export interface SmenaStateInterface {
    isOpenedSmena?: Smena | null | undefined,
    isLoading: boolean,
    validationErrors?: any
}
