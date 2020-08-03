import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Observable} from 'rxjs';
import {Config} from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  internship(id):  Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}agreemen/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  internships(email): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}agreemen/filter/` + email, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  studentInternship(id): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}agreemen/etudiant/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addInternship(internship): Observable<boolean> {
    internship.etudiant = this.storage.get('user')
    return this.http.post<any>(`${Config.BASE_URL}agreemen`, JSON.stringify(internship), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateInternship(internship): Observable<boolean> {
    internship.etudiant = this.storage.get('user')
    console.log(JSON.stringify(internship))
    return this.http.put<any>(`${Config.BASE_URL}agreemen`, JSON.stringify(internship), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  export(id): Observable<Blob> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});
    return this.http.get<Blob>(`${Config.BASE_URL}agreemen/export/` + id,  { headers : headers,responseType :
        'blob' as 'json'});
  }

}
