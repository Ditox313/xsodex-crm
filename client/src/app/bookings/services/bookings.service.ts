
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Act, Booking, Pay } from '../types/bookings.interfaces';
import { ClientFiz } from 'src/app/clients/types/clientsFiz/clientsFiz.interfaces';
import { ClientLaw } from 'src/app/clients/types/clientsLaw/clientsLaw.interfaces';

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

  // Находим бронь по id
  getById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`/api/bookings/${id}`);
  }

  

  // Создаем платеж
  create_pay(pay_1: Pay, pay_2: Pay, pay_3: Pay, pay_4: Pay, pay_5: Pay): Observable<any> {
    
    const pays = {
      pay_1: pay_1,
      pay_2: pay_2,
      pay_3: pay_3,
      pay_4: pay_4,
      pay_5: pay_5,
    }
    return this.http.post<any>(`/api/bookings/create-pay`, pays);
  }




  // Получаем список всех платежей для брони
  getAllPays(id: string | undefined): Observable<Pay[]> {
    return this.http.get<Pay[]>(`/api/bookings/pays/${id}`);
  }





  // Получаем клиента для акта
  currentClientForAct(id: string | undefined): Observable<ClientFiz | ClientLaw> {
    return this.http.get<ClientFiz | ClientLaw>(`/api/bookings/current-client-for-booking/${id}`);
  }





  // Создаем акт для брони
  addActBooking( act: Act): Observable<Act> {
    return this.http.post<Act>(`/api/bookings/add-act-booking`, act);
  }




  // Меняем статус брони когда авто поехало
  toggleStatusBooking(bookingId: string | undefined): Observable<Booking> {
    return this.http.get<Booking>(`/api/bookings/toggle-status-booking/${bookingId}`);
  }




  // Получаем текущий акт
  currentAct(id: string | undefined): Observable<Act> {
    return this.http.get<Act>(`/api/bookings/current-act/${id}`);
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
