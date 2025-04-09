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








export const settingsSkladListSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.settingsSkladList
)


export const noMoreSettingsSkladList = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.noMoreSettingsSkladList
)


export const getCurrentSettingSkladSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.currentSettingSklad
)






export const settingsGlobalListSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.settingsGlobalList
)


export const noMoreSettingsGlobalList = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.noMoreSettingsGlobalList
)


export const getCurrentSettingGlobalSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.currentSettingGlobal
)






