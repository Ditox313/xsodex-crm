
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientFiz } from '../../types/clientsFiz/clientsFiz.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientsFizService {
  constructor(private http: HttpClient) {}

  // Создаем нового физического клиента
  create(
    clientFiz: ClientFiz,
    file_1?: File,
    file_2?: File,
    file_3?: File,
    file_4?: File
  ): Observable<ClientFiz> {
    const fd = new FormData();
    fd.append('name', clientFiz.name);
    fd.append('surname', clientFiz.surname);
    fd.append('lastname', clientFiz.lastname);
    fd.append('date_birth', clientFiz.date_birth);
    fd.append('passport_seria', clientFiz.passport_seria);
    fd.append('passport_number', clientFiz.passport_number);
    fd.append('passport_date', clientFiz.passport_date);
    fd.append('passport_who_take', clientFiz.passport_who_take);
    fd.append('code_podrazdeleniya', clientFiz.code_podrazdeleniya);
    fd.append('passport_register', clientFiz.passport_register);
    fd.append('passport_address_fact', clientFiz.passport_address_fact ? clientFiz.passport_address_fact : '');
    fd.append('prava_seria', clientFiz.prava_seria);
    fd.append('prava_number', clientFiz.prava_number);
    fd.append('prava_date', clientFiz.prava_date);
    fd.append('resident', clientFiz.resident ? clientFiz.resident.toString() : '');
    fd.append('phone_1', clientFiz.phone_1);
    fd.append('phone_2_dop_name', clientFiz.phone_2_dop_name ? clientFiz.phone_2_dop_name : '');
    fd.append('phone_2_dop_number', clientFiz.phone_2_dop_number ? clientFiz.phone_2_dop_number : '');
    fd.append('phone_3_dop_name', clientFiz.phone_3_dop_name ? clientFiz.phone_3_dop_name : '');
    fd.append('phone_3_dop_number', clientFiz.phone_3_dop_number ? clientFiz.phone_3_dop_number : '');
    fd.append('phone_4_dop_name', clientFiz.phone_4_dop_name ? clientFiz.phone_4_dop_name : '');
    fd.append('phone_4_dop_number', clientFiz.phone_4_dop_number ? clientFiz.phone_4_dop_number : '');
    fd.append('phone_5_dop_name', clientFiz.phone_5_dop_name ? clientFiz.phone_5_dop_name : '');
    fd.append('phone_5_dop_number', clientFiz.phone_5_dop_number ? clientFiz.phone_5_dop_number : '');
   

    if (file_1) {
      fd.append('file_1', file_1, file_1.name);
    }

    if (file_2) {
      fd.append('file_2', file_2, file_2.name);
    }

    if (file_3) {
      fd.append('file_3', file_3, file_3.name);
    }

    if (file_4) {
      fd.append('file_4', file_4, file_4.name);
    }

    return this.http.post<ClientFiz>(`/api/clientsFiz/create`, fd);
  }

  // Получаем список всех клиентов
  getAllClientsFiz(params: any = {}): Observable<ClientFiz[]> {
    return this.http.get<ClientFiz[]>('/api/clientsFiz/clientsFiz-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  getById(id: string): Observable<ClientFiz> {
    return this.http.get<ClientFiz>(`/api/clientsFiz/${id}`);
  }



  // update(partner: Partner,
  //     file_1?: File,
  //     file_2?: File): Observable<Partner> {
  //     const fd = new FormData();
      
  //     fd.append('name', partner.name);
  //     fd.append('surname', partner.surname);
  //     fd.append('lastname', partner.lastname);
  //     fd.append('passport_seria', partner.passport_seria);
  //     fd.append('passport_number', partner.passport_number);
  //     fd.append('passport_date', partner.passport_date);
  //     fd.append('passport_who_take', partner.passport_who_take);
  //     fd.append('code_podrazdeleniya', partner.code_podrazdeleniya);
  //     fd.append('passport_register', partner.passport_register);
  //     fd.append('phone_1', partner.phone_1);
  //     fd.append('phone_2', partner.phone_2);

  //     if (file_1) {
  //       fd.append('file_1', file_1, file_1.name);
  //     }

  //     if (file_2) {
  //       fd.append('file_2', file_2, file_2.name);
  //     }

  //     if (partner._id) {
  //       fd.append('_id', partner._id);
  //     }

  //     return this.http.patch<Partner>(`/api/partners/update/${partner._id}`, fd);
  //  }


  // Удаление
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`/api/clientsFiz/clientFiz-remove/${id}`);
  }
}
