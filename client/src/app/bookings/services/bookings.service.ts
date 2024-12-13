
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




  

  edit(booking: Booking): Observable<Booking> {
    const fd = new FormData();
  
    // Основные поля брони
    fd.append('_id', booking._id || '');
    fd.append('booking_start', booking.booking_start || '');
    fd.append('booking_end', booking.booking_end || '');
    fd.append('booking_days', (booking.booking_days || 0).toString());
  
    // Проверка и добавление сложных объектов в JSON
    fd.append('extends', JSON.stringify(booking.extends || []));
    fd.append('closeInfo', JSON.stringify(booking.closeInfo || {}));
    fd.append('openInfo', JSON.stringify(booking.openInfo || {}));
  
    // Машина
    if (booking.car && booking.car._id) {
      fd.append('car', booking.car._id);
    }
  
    // Тарифы
    fd.append('tarif', JSON.stringify(booking.tarif || []));
    fd.append('tarifCheked', booking.tarifCheked.toString());
    fd.append('zalog', (booking.zalog || 0).toString());
  
    // Клиент
    if (booking.client && booking.client._id) {
      fd.append('client', booking.client._id);
    }
  
    // Остальные поля
    fd.append('place_start', booking.place_start || '');
    fd.append('place_start_price', (booking.place_start_price || 0).toString());
    fd.append('place_end', booking.place_end || '');
    fd.append('place_end_price', (booking.place_end_price || 0).toString());
    fd.append('arenda', (booking.arenda || 0).toString());
    fd.append('custome_place_start', (booking.custome_place_start || 0).toString());
    fd.append('custome_place_end', (booking.custome_place_end || 0).toString());
    fd.append('custome_zalog', (booking.custome_zalog || 0).toString());
  
    // Дополнительные услуги
    fd.append('additional_services', JSON.stringify(booking.additional_services || []));
    fd.append('additional_services_price', (booking.additional_services_price || 0).toString());
  
    // Смена и пользователь
    fd.append('smenaId', booking.smenaId || '');
    fd.append('summaFull', (booking.summaFull || 0).toString());
    fd.append('paidCount', (booking.paidCount || 0).toString());
  
    // Комментарий
    fd.append('comment', booking.comment || '');
  
    // Статус и скидка
    fd.append('status', booking.status || '');
    fd.append('sale', (booking.sale || 0).toString());
  
    // Мастер приемщик
    fd.append('masterPriem', JSON.stringify(booking.masterPriem || {}));
  
    // ID пользователя
    fd.append('userId', booking.userId || '');
  
    // Отправка запроса на сервер
    return this.http.patch<Booking>(`/api/bookings/edit/${booking._id}`, fd);
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






  // Продление брони
  extendBooking(data: any): Observable<Booking> {
    return this.http.post<Booking>(`/api/bookings/extend`, data);
  }


  // закрытие брони
  closeBooking(data: any): Observable<any> {
    return this.http.post<any>(`/api/bookings/close`, data);
  }










 
}
