import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, tap } from 'rxjs';
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
}