
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from '../types/partners.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  constructor(private http: HttpClient) {}

  // Создаем нового партнера
  create(
    partner: Partner,
    file_1?: File,
    file_2?: File
  ): Observable<Partner> {
    const fd = new FormData();
    fd.append('name', partner.name);
    fd.append('surname', partner.surname);
    fd.append('lastname', partner.lastname);
    fd.append('passport_seria', partner.passport_seria);
    fd.append('passport_number', partner.passport_number);
    fd.append('passport_date', partner.passport_date);
    fd.append('passport_who_take', partner.passport_who_take);
    fd.append('code_podrazdeleniya', partner.code_podrazdeleniya);
    fd.append('passport_register', partner.passport_register);
    fd.append('phone_1', partner.phone_1);
    fd.append('phone_2', partner.phone_2);

    if (file_1) {
      fd.append('file_1', file_1, file_1.name);
    }

    if (file_2) {
      fd.append('file_2', file_2, file_2.name);
    }

    return this.http.post<Partner>(`/api/partners/create`, fd);
  }

  // Получаем список всех партнеров
  getAllPartners(params: any = {}): Observable<Partner[]> {
    return this.http.get<Partner[]>('/api/partners/partners-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }



  // Получаем список всех партнеров без параметров
  getAllPartnersNoParams(): Observable<Partner[]> {
    return this.http.get<Partner[]>('/api/partners/partners-list-no-params');
  }


  getById(id: string): Observable<Partner> {
    return this.http.get<Partner>(`/api/partners/${id}`);
  }



  update(partner: Partner,
      file_1?: File,
      file_2?: File): Observable<Partner> {
      const fd = new FormData();
      
      fd.append('name', partner.name);
      fd.append('surname', partner.surname);
      fd.append('lastname', partner.lastname);
      fd.append('passport_seria', partner.passport_seria);
      fd.append('passport_number', partner.passport_number);
      fd.append('passport_date', partner.passport_date);
      fd.append('passport_who_take', partner.passport_who_take);
      fd.append('code_podrazdeleniya', partner.code_podrazdeleniya);
      fd.append('passport_register', partner.passport_register);
      fd.append('phone_1', partner.phone_1);
      fd.append('phone_2', partner.phone_2);

      if (file_1) {
        fd.append('file_1', file_1, file_1.name);
      }

      if (file_2) {
        fd.append('file_2', file_2, file_2.name);
      }

      if (partner._id) {
        fd.append('_id', partner._id);
      }

      return this.http.patch<Partner>(`/api/partners/update/${partner._id}`, fd);
   }


  // Удаление
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`/api/partners/partner-remove/${id}`);
  }
}
