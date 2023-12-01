
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingAvtopark } from '../types/settings.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}


  create_setting_avtopark(settings: SettingAvtopark,): Observable<SettingAvtopark> {
    return this.http.post<SettingAvtopark>(`/api/settings/create_setting_avtopark`, settings);
  }

  // Получаем список всех настроек автопарка
  getAllSettingsAvtopark(params: any = {}): Observable<SettingAvtopark[]> {
    return this.http.get<SettingAvtopark[]>('/api/settings/settings-avtopark-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  getByIdSettingsAvtopark(id: string): Observable<SettingAvtopark> {
    return this.http.get<SettingAvtopark>(`/api/settings/get-settings-avtopark/${id}`);
  }



  updateSettingsAvtopark(settingAvtopark: SettingAvtopark): Observable<SettingAvtopark> {
    return this.http.patch<SettingAvtopark>(`/api/settings/update-settings-avtopark/${settingAvtopark._id}`, settingAvtopark);
   }



  // Удаление настроек автопарка
  deleteSettingAvtopark(id: any): Observable<any> {
    return this.http.delete<any>(`/api/settings/setting-avtopark-remove/${id}`);
  }
}
