

//Интерфейс для партнера
export interface SettingAvtopark {
    share_avto: Object,
    input_avto: Object,
    washing_avto: Object,
    additionally_avto: Object,
    title?: string
}



// Интерфейс для state settings
export interface SettingsStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    settingsAvtoparkList?: SettingAvtopark[] | null | undefined | any,
    noMoreSettingsAvtoparkList: boolean
    currentSettingAvtopark: SettingAvtopark | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех партнеров
export interface SettingsParamsFetch {
    offset: number | null,
    limit: number | null
}