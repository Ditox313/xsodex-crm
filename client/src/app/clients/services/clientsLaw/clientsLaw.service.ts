
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientLaw, Dogovor } from '../../types/clientsLaw/clientsLaw.interfaces';
import { Act, Booking } from 'src/app/bookings/types/bookings.interfaces';

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
    fd.append('type', clientLaw.type);
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
  getAllClientsLaw(params: any = {}): Observable<ClientLaw[]> {
    return this.http.get<ClientLaw[]>('/api/clientsLaw/clientsLaw-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  getById(id: string): Observable<ClientLaw> {
    return this.http.get<ClientLaw>(`/api/clientsLaw/${id}`);
  }



  update(clientLaw: ClientLaw,
    file_1?: File,
    file_2?: File,
    file_3?: File,
    file_4?: File): Observable<ClientLaw> {
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

    if (clientLaw._id) {
      fd.append('_id', clientLaw._id);
    }


    return this.http.patch<ClientLaw>(`/api/clientsLaw/update/${clientLaw._id}`, fd);
   }


  // Удаление юрлица
  delete(id: any): Observable<any> {
    console.log(`/api/clientsLaw/clientLaw-remove/${id}`);
  
    return this.http.delete<any>(`/api/clientsLaw/clientLaw-remove/${id}`);
  }



  // Создаем договор
  create_dogovor(dogovor: Dogovor): Observable<Dogovor> {
    return this.http.post<Dogovor>(`/api/clientsLaw/create_dogovor`, dogovor);
  }



  // Получить все договоры
  get_all_dogovors(params: any = {}): Observable<any> {
    return this.http.get<any>(`/api/clientsLaw/get_all_dogovors/${params.params.params.clientId}`, {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  // Удаление договора
  delete_dogovor(id: any): Observable<any> {
    return this.http.delete<any>(`/api/clientsLaw/clientLawDogovor-remove/${id}`);
  }

  // Получаем договор по id
  getDogovorById(id: string): Observable<Dogovor> {
    return this.http.get<Dogovor>(`/api/clientsFiz/get-dogovor/${id}`);
  }


  // Поиск
  search(searchData: any): Observable<ClientLaw[]> {
    return this.http.post<ClientLaw[]>('/api/clientsLaw/search-client', searchData)
  }




  // Получаем список актов для клиента
  actsListForClientLaw(params: any = {}): Observable<Act[]> {
    return this.http.get<Act[]>(`/api/clientsLaw/acts-list/${params.params.clientId}`, {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }



  // Получаем список броней для клиента
  bookingsListForClientLaw(params: any = {}): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/clientsLaw/bookings-list/${params.params.clientId}`, {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }
}
