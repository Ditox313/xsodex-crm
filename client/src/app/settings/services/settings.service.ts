
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingAvtopark, SettingGlobal, SettingSklad } from '../types/settings.interfaces';

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



  // Создаем настройку глобальную
  create_setting_global(settings: SettingGlobal): Observable<SettingGlobal> {
    return this.http.post<SettingGlobal>(`/api/settings/create_setting_global`, settings);
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



    // Получаем список всех настроек общих
    getAllSettingsGlobal(params: any = {}): Observable<SettingGlobal[]> {
      return this.http.get<SettingGlobal[]>('/api/settings/settings-global-list', {
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


    // Получаем настройки общие
    getByIdSettingsGlobal(id: string): Observable<SettingGlobal> {
      return this.http.get<SettingGlobal>(`/api/settings/get-settings-global/${id}`);
    }













 // Обновляем настройки автопарка
  updateSettingsAvtopark(settingAvtopark: SettingAvtopark): Observable<SettingAvtopark> {
    return this.http.patch<SettingAvtopark>(`/api/settings/update-settings-avtopark/${settingAvtopark._id}`, settingAvtopark);
   }


   // Обновляем настройки склада
  updateSettingsSklad(settingSklad: SettingSklad): Observable<SettingSklad> {
    return this.http.patch<SettingSklad>(`/api/settings/update-settings-sklad/${settingSklad._id}`, settingSklad);
   }

      // Обновляем настройки общие
  updateSettingsGlobal(settingGlobal: SettingGlobal): Observable<SettingGlobal> {
    return this.http.patch<SettingGlobal>(`/api/settings/update-settings-global/${settingGlobal._id}`, settingGlobal);
   }













  // Удаление настроек автопарка
  deleteSettingAvtopark(id: any): Observable<any> {
    return this.http.delete<any>(`/api/settings/setting-avtopark-remove/${id}`);
  }

  // Удаление настроек склада
  deleteSettingSklad(id: any): Observable<any> {
    return this.http.delete<any>(`/api/settings/setting-sklad-remove/${id}`);
  }


  // Удаление настроек склада
  deleteSettingGlobal(id: any): Observable<any> {
    return this.http.delete<any>(`/api/settings/setting-global-remove/${id}`);
  }
}
