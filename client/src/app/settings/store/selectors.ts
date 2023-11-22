import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SettingsStateInterface } from '../types/settings.interfaces';




export const settingsFeatureSelector = createFeatureSelector<SettingsStateInterface>('settings');



export const isLoadingSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.isLoading
)

export const partnersListSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.settingsList
)


export const noMorePartnersList = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.noMoreSettingsList
)


export const getCurrentPartnerSelector = createSelector(
    settingsFeatureSelector,
    (state: SettingsStateInterface) => state.currentSetting
)






