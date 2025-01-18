import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Smena } from '../types/smena.interfaces';
import { Pay } from 'src/app/bookings/types/bookings.interfaces';


@Injectable({
  providedIn: 'root',
})
export class SmenaService {
  constructor(private http: HttpClient) {}

  
  open(smena: Smena): Observable<Smena> {
    return this.http.post<Smena>(`/api/smena/open`, smena);
  }

  isOpenSmena(): Observable<any> {
    return this.http.get<Smena | null>(`/api/smena/is-open-smena`);
  }

  getAllSmena(params: any = {}): Observable<Smena[]> {
    return this.http.get<Smena[]>('/api/smena/smena-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }


  getAllSmenaPays(smenaId: any): Observable<Pay[]> {
    return this.http.get<Pay[]>(`/api/smena/pays-list/${smenaId}`);
  }




  delete(id: string | undefined): Observable<any> {
    return this.http.delete<any>(`/api/smena/remove/${id}`);
  }

  getById(id: string): Observable<Smena> {
    return this.http.get<Smena>(`/api/smena/${id}`);
  }

  close(id: string, close_date: string): Observable<Smena> {
    const data = {
      close_date: close_date
    }
    
    return this.http.patch<Smena>(`/api/smena/close/${id}`, data);
  }
}