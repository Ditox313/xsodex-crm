import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Smena } from '../types/smena.interfaces';


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

  delete(id: string | undefined): Observable<any> {
    return this.http.delete<any>(`/api/smena/remove/${id}`);
  }

}