
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../types/bookings.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient) {}

  // Создаем бронь
  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`/api/bookings/create`, booking);
  }


  // Получаем список всех броней
  getAllBookings(params: any = {}): Observable<Booking[]> {
    return this.http.get<Booking[]>('/api/bookings/bookings-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  // Удаление
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`/api/bookings/booking-remove/${id}`);
  }




  // Получаем список всех клиентов для поиска
  getAllClientsForSearch(params: any = {}): Observable<any[]> {
    return this.http.get<any[]>('/api/bookings/clients-for-search-booking', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }



  // Поиск
  search(searchData: any): Observable<any[]> {
    return this.http.post<any[]>('/api/bookings/search-clients', searchData)
  }


  getById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`/api/bookings/${id}`);
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


 
}
