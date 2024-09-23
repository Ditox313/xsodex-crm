
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingAvtopark, SettingSklad } from '../types/settings.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}


  // Создаем настройку автопроката
  create_setting_avtopark(settings: SettingAvtopark,): Observable<SettingAvtopark> {
    return this.http.post<SettingAvtopark>(`/api/settings/create_setting_avtopark`, settings);
  }


  // Создаем настройку склада
  create_setting_sklad(settings: SettingSklad): Observable<SettingSklad> {
    return this.http.post<SettingSklad>(`/api/settings/create_setting_sklad`, settings);
  }


  // Получаем список всех настроек автопарка
  getAllSettingsAvtopark(params: any = {}): Observable<SettingAvtopark[]> {
    return this.http.get<SettingAvtopark[]>('/api/settings/settings-avtopark-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  // Получаем список всех настроек склада
  getAllSettingsSklad(params: any = {}): Observable<SettingSklad[]> {
    return this.http.get<SettingSklad[]>('/api/settings/settings-sklad-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  // Получаем настройки автопарка
  getByIdSettingsAvtopark(id: string): Observable<SettingAvtopark> {
    return this.http.get<SettingAvtopark>(`/api/settings/get-settings-avtopark/${id}`);
  }


  
  // Получаем настройки склада
  getByIdSettingsSklad(id: string): Observable<SettingSklad> {
    return this.http.get<SettingSklad>(`/api/settings/get-settings-sklad/${id}`);
  }


 // Обновляем настройки автопарка
  updateSettingsAvtopark(settingAvtopark: SettingAvtopark): Observable<SettingAvtopark> {
    return this.http.patch<SettingAvtopark>(`/api/settings/update-settings-avtopark/${settingAvtopark._id}`, settingAvtopark);
   }


   // Обновляем настройки склада
  updateSettingsSklad(settingSklad: SettingSklad): Observable<SettingSklad> {
    return this.http.patch<SettingSklad>(`/api/settings/update-settings-sklad/${settingSklad._id}`, settingSklad);
   }




  // Удаление настроек автопарка
  deleteSettingAvtopark(id: any): Observable<any> {
    return this.http.delete<any>(`/api/settings/setting-avtopark-remove/${id}`);
  }
}
