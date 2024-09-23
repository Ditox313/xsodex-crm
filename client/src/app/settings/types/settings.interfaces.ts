

//Интерфейс для настроек автопарка
export interface SettingAvtopark {
    _id? : string,
    share_avto: Object,
    input_avto: Object,
    washing_avto: Object,
    additionally_avto: Object,
    title?: string
}


//Интерфейс для настроек склада
export interface SettingSklad {
    _id? : string,
    sklad_name_1: string,
    sklad_name_2: string,
    sklad_name_3: string,
    sklad_name_4: string,
    sklad_name_5: string,
    sklad_name_6: string,
    sklad_name_7: string,
    sklad_name_8: string,
    sklad_name_9: string,
    sklad_name_10: string,
    sklad_name_11: string,
    sklad_name_12: string,
    sklad_name_13: string,
    sklad_name_14: string,
    sklad_name_15: string,
    title?: string
}



// Интерфейс для state settings
export interface SettingsStateInterface {
    isLoading: boolean,
    validationErrors?: any,
    settingsAvtoparkList?: SettingAvtopark[] | null | undefined | any,
    noMoreSettingsAvtoparkList: boolean
    currentSettingAvtopark: SettingAvtopark | null | undefined | any,

    settingsSkladList?: SettingSklad[] | null | undefined | any,
    noMoreSettingsSkladList: boolean
    currentSettingSklad: SettingAvtopark | null | undefined | any,
}




// Интерфейс для параметров запроса на получение всех партнеров
export interface SettingsParamsFetch {
    offset: number | null,
    limit: number | null
}