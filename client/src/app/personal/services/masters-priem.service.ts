
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MasterPriem } from '../types/masters-priem.interfaces';


@Injectable({
  providedIn: 'root',
})
export class MastersPriemService {

  constructor(private http: HttpClient ) {}

    createMasterPriem(
      masterPriem: MasterPriem,
      files?: any
    ): Observable<MasterPriem> {
      const fd = new FormData();
      fd.append('name', masterPriem.name);
      fd.append('surname', masterPriem.surname);
      fd.append('lastname', masterPriem.lastname);



      



      return this.http.post<MasterPriem>(`/api/personal/master-priem/create`, masterPriem);
    }





    
    update(masterPriem: MasterPriem,
      files: any): Observable<MasterPriem> {
      const fd = new FormData();
      
      fd.append('name', masterPriem.name);
      fd.append('surname', masterPriem.surname);
      fd.append('lastname', masterPriem.lastname);


      // for (let i = 0; i < files.length; i++) {
      //   fd.append('files', files[i], files[i].name);
      // }

      if (masterPriem._id) {
        fd.append('_id', masterPriem._id);
      }

      return this.http.patch<MasterPriem>(`/api/personal/master-priem/update/${masterPriem._id}`, fd);
   }















  // Получаем список всех мастеров приемщиков
  getAllMastersPriem(params: any = {}): Observable<MasterPriem[]> {
    return this.http.get<MasterPriem[]>('/api/personal/masters-priem-list', {
      params: new HttpParams({
        fromObject: params.params.params
      })
    });
  }



  // Получаем список всех партнеров без параметров
  getAllMastersPriemNoParams(): Observable<MasterPriem[]> {
    return this.http.get<MasterPriem[]>('/api/personal/masters-priem-list-no-params');
  }




  // Получаем по Id
  getById(id: string): Observable<MasterPriem> {
    return this.http.get<MasterPriem>(`/api/personal/master-priem/${id}`);
  }



  


  // Удаление
  delete(id: any): Observable<any> {
    return this.http.delete<any>(`/api/personal/master-priem-remove/${id}`);
  }






  fileUpload(formData: any) {
    return this.http.post('/api/partners/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event)),
    );
  }

  
  private getEventMessage(event:any) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `Upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event: any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { progress: percentDone, files: [] };
  }
}
