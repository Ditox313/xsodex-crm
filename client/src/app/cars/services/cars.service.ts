
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Car } from '../types/cars.interfaces';



@Injectable({
   providedIn: 'root',
})
export class CarsService {
constructor(private http: HttpClient) { }


   create(car: Car, avatar?: File): Observable<Car> {
      
      const fd = new FormData();
      fd.append('marka', car.marka);
      fd.append('model', car.model);
      fd.append('number', car.number);
      fd.append('probeg', car.probeg);
      fd.append('transmission', car.transmission);
      fd.append('start_arenda', car.start_arenda);
      fd.append('end_arenda', car.end_arenda);
      fd.append('vladelec', car.vladelec);
      fd.append('category', car.category);
      fd.append('status', car.status);
      fd.append('sts_seria', car.sts_seria);
      fd.append('sts_number', car.sts_number);
      fd.append('sts_date', car.sts_date);
      fd.append('osago_seria', car.osago_seria);
      fd.append('osago_number', car.osago_number);
      fd.append('osago_date_finish', car.osago_date_finish);
      fd.append('vin', car.vin);
      fd.append('kuzov_number', car.kuzov_number);
      fd.append('color', car.color);
      fd.append('year_production', car.year_production);
      fd.append('price_ocenka', car.price_ocenka);
      fd.append('to_date', car.to_date);
      fd.append('to_probeg_prev', car.to_probeg_prev);
      fd.append('to_probeg_next', car.to_probeg_next);
      fd.append('to_interval', car.to_interval);
      fd.append('oil_name', car.oil_name);
      fd.append('stoa_name', car.stoa_name);
      fd.append('stoa_phone', car.stoa_phone);


      fd.append('tarif_gorod', JSON.stringify(car.tarif_gorod) );
      fd.append('tarif_mejgorod', JSON.stringify(car.tarif_mejgorod));
      fd.append('tarif_russia', JSON.stringify(car.tarif_russia));


      if (car.userId)
      {
         fd.append('userId', car.userId);
      }
      
   
      if (avatar) {
         fd.append('avatar', avatar, avatar.name);
      }
      

      return this.http.post<Car>('/api/cars/create/', fd);
   }



   getAllCars(params: any = {}): Observable<Car[]> {
      return this.http.get<Car[]>('/api/cars/cars-list', {
         params: new HttpParams({
            fromObject: params.params.params
         })
      });
   }



   getById(id: string): Observable<Car> {
      return this.http.get<Car>(`/api/cars/${id}`);
   }



   delete(id: any): Observable<any> {
      return this.http.delete<any>(`/api/cars/car-remove/${id}`);
   }



   update(car: Car, avatar?: File): Observable<Car> {
      const fd = new FormData();
      
      fd.append('marka', car.marka);
      fd.append('model', car.model);
      fd.append('number', car.number);
      fd.append('probeg', car.probeg);
      fd.append('transmission', car.transmission);
      fd.append('start_arenda', car.start_arenda);
      fd.append('end_arenda', car.end_arenda);
      fd.append('vladelec', car.vladelec);
      fd.append('category', car.category);
      fd.append('status', car.status);
      fd.append('sts_seria', car.sts_seria);
      fd.append('sts_number', car.sts_number);
      fd.append('sts_date', car.sts_date);
      fd.append('osago_seria', car.osago_seria);
      fd.append('osago_number', car.osago_number);
      fd.append('osago_date_finish', car.osago_date_finish);
      fd.append('vin', car.vin);
      fd.append('kuzov_number', car.kuzov_number);
      fd.append('color', car.color);
      fd.append('year_production', car.year_production);
      fd.append('price_ocenka', car.price_ocenka);
      fd.append('to_date', car.to_date);
      fd.append('to_probeg_prev', car.to_probeg_prev);
      fd.append('to_probeg_next', car.to_probeg_next);
      fd.append('to_interval', car.to_interval);
      fd.append('oil_name', car.oil_name);
      fd.append('stoa_name', car.stoa_name);
      fd.append('stoa_phone', car.stoa_phone);

      fd.append('tarif_gorod', JSON.stringify(car.tarif_gorod));
      fd.append('tarif_mejgorod', JSON.stringify(car.tarif_mejgorod));
      fd.append('tarif_russia', JSON.stringify(car.tarif_russia));


      if (avatar) {
         fd.append('avatar', avatar, avatar.name);
      }

      if (car._id) {
         fd.append('_id', car._id);
      }

      return this.http.patch<Car>(`/api/cars/update/${car._id}`, fd);
   }

  
}