
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientLaw } from '../../types/clientsLaw/clientsLaw.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientsLawService {
  constructor(private http: HttpClient) {}

  // Создаем нового Юридического клиента
  create(
    clientLaw: ClientLaw,
    file_1?: File,
    file_2?: File,
    file_3?: File,
    file_4?: File
  ): Observable<ClientLaw> {
    const fd = new FormData();
    fd.append('name', clientLaw.name);
    fd.append('short_name', clientLaw.short_name);
    fd.append('inn', clientLaw.inn);
    fd.append('kpp', clientLaw.kpp);
    fd.append('ogrn', clientLaw.ogrn ? clientLaw.ogrn : '');
    fd.append('ogrn_ip', clientLaw.ogrn_ip ? clientLaw.ogrn_ip : '');
    fd.append('svidetelstvo_ip', clientLaw.svidetelstvo_ip ? clientLaw.svidetelstvo_ip : '');
    fd.append('law_address', clientLaw.law_address);
    fd.append('fact_address', clientLaw.fact_address);
    fd.append('mail_address', clientLaw.mail_address);
    fd.append('boss_role', clientLaw.boss_role);
    fd.append('boss_name', clientLaw.boss_name);
    fd.append('boss_surname', clientLaw.boss_surname);
    fd.append('boss_lastname', clientLaw.boss_lastname);
    fd.append('osnovanie_boss_role', clientLaw.osnovanie_boss_role);
    fd.append('phone_1', clientLaw.phone_1);
    fd.append('phone_2', clientLaw.phone_2);
    fd.append('email', clientLaw.email);
    fd.append('rc_number', clientLaw.rc_number);
    fd.append('kor_rc_number', clientLaw.kor_rc_number);
    fd.append('bik_number', clientLaw.bik_number);
    fd.append('name_bank', clientLaw.name_bank);
   
    
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

    return this.http.post<ClientLaw>(`/api/clientsLaw/create`, fd);
  }

  // Получаем список всех клиентов
  // getAllClientsFiz(params: any = {}): Observable<ClientFiz[]> {
  //   return this.http.get<ClientFiz[]>('/api/clientsFiz/clientsFiz-list', {
  //     params: new HttpParams({
  //       fromObject: params.params.params
  //     })
  //   });
  // }


  // getById(id: string): Observable<ClientFiz> {
  //   return this.http.get<ClientFiz>(`/api/clientsFiz/${id}`);
  // }



  // update(clientFiz: ClientFiz,
  //   file_1?: File,
  //   file_2?: File,
  //   file_3?: File,
  //   file_4?: File): Observable<ClientFiz> {
  //   const fd = new FormData();
      
  //   fd.append('name', clientFiz.name);
  //   fd.append('surname', clientFiz.surname);
  //   fd.append('lastname', clientFiz.lastname);
  //   fd.append('date_birth', clientFiz.date_birth);
  //   fd.append('passport_seria', clientFiz.passport_seria);
  //   fd.append('passport_number', clientFiz.passport_number);
  //   fd.append('passport_date', clientFiz.passport_date);
  //   fd.append('passport_who_take', clientFiz.passport_who_take);
  //   fd.append('code_podrazdeleniya', clientFiz.code_podrazdeleniya);
  //   fd.append('passport_register', clientFiz.passport_register);
  //   fd.append('passport_address_fact', clientFiz.passport_address_fact ? clientFiz.passport_address_fact : '');
  //   fd.append('prava_seria', clientFiz.prava_seria);
  //   fd.append('prava_number', clientFiz.prava_number);
  //   fd.append('prava_date', clientFiz.prava_date);
  //   fd.append('resident', clientFiz.resident ? clientFiz.resident.toString() : '');
  //   fd.append('phone_1', clientFiz.phone_1);
  //   fd.append('phone_2_dop_name', clientFiz.phone_2_dop_name ? clientFiz.phone_2_dop_name : '');
  //   fd.append('phone_2_dop_number', clientFiz.phone_2_dop_number ? clientFiz.phone_2_dop_number : '');
  //   fd.append('phone_3_dop_name', clientFiz.phone_3_dop_name ? clientFiz.phone_3_dop_name : '');
  //   fd.append('phone_3_dop_number', clientFiz.phone_3_dop_number ? clientFiz.phone_3_dop_number : '');
  //   fd.append('phone_4_dop_name', clientFiz.phone_4_dop_name ? clientFiz.phone_4_dop_name : '');
  //   fd.append('phone_4_dop_number', clientFiz.phone_4_dop_number ? clientFiz.phone_4_dop_number : '');
  //   fd.append('phone_5_dop_name', clientFiz.phone_5_dop_name ? clientFiz.phone_5_dop_name : '');
  //   fd.append('phone_5_dop_number', clientFiz.phone_5_dop_number ? clientFiz.phone_5_dop_number : '');


  //   if (clientFiz._id) {
  //     fd.append('_id', clientFiz._id);
  //   }


  //   if (file_1) {
  //     fd.append('file_1', file_1, file_1.name);
  //   }

  //   if (file_2) {
  //     fd.append('file_2', file_2, file_2.name);
  //   }

  //   if (file_3) {
  //     fd.append('file_3', file_3, file_3.name);
  //   }

  //   if (file_4) {
  //     fd.append('file_4', file_4, file_4.name);
  //   }

  //   return this.http.patch<ClientFiz>(`/api/clientsFiz/update/${clientFiz._id}`, fd);
  //  }


  // Удаление физлица
  // delete(id: any): Observable<any> {
  //   return this.http.delete<any>(`/api/clientsFiz/clientFiz-remove/${id}`);
  // }



  // Создаем договор
  // create_dogovor(dogovor: Dogovor): Observable<Dogovor> {
  //   return this.http.post<Dogovor>(`/api/clientsFiz/create_dogovor`, dogovor);
  // }



  // Получить все договоры
  // get_all_dogovors(params: any = {}): Observable<any> {
  //   return this.http.get<any>(`/api/clientsFiz/get_all_dogovors/${params.params.params.clientId}`, {
  //     params: new HttpParams({
  //       fromObject: params.params.params
  //     })
  //   });
  // }


  // Удаление договора
  // delete_dogovor(id: any): Observable<any> {
  //   return this.http.delete<any>(`/api/clientsFiz/clientFizDogovor-remove/${id}`);
  // }

  // Получаем договор по id
  // getDogovorById(id: string): Observable<Dogovor> {
  //   return this.http.get<Dogovor>(`/api/clientsFiz/delete-dogovor/${id}`);
  // }


  // Поиск
  // search(searchData: any): Observable<ClientFiz[]> {
  //   return this.http.post<ClientFiz[]>('/api/clientsFiz/search-client', searchData)
  // }
}
