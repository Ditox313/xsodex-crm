import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings.interfaces';




export const settingsFeatureSelector = createFeatureSelector<SettingsStateInterface>('settings');



export const isLoadingSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.isLoading
)

export const settingsAvtoparkListSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.settingsAvtoparkList
)


export const noMoreSettingsAvtoparkList = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.noMoreSettingsAvtoparkList
)


export const getCurrentSettingAvtoparkSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.currentSettingAvtopark
)






