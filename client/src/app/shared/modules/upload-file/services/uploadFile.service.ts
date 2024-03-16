
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {

  constructor(private http: HttpClient) {}



  // Удаление
  delete_file(data: any): Observable<any> {
    return this.http.post<any>(`/api/shared/delete_file/`, data);
  }

}
