

//Интерфейс для партнера
export interface Setting {
    [key: string]: unknown,
}



// Интерфейс для state settings
export interface SettingsStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    settingsList?: any[] | null | undefined | any,
    noMoreSettingsList: boolean
    currentSetting: any | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех партнеров
export interface SettingsParamsFetch {
    offset: number | null,
    limit: number | null
}