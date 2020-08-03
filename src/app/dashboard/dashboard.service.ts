import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  statEtrangerSheet(): Observable<any> {
    return this.http.get<any>(`${Config.BASE_URL}sheet/dashboard`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  getOffres(place:string): Observable<any[]> {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?location=`+place, {
      headers: new HttpHeaders({
        'origin': 'localhost'
      })
    });
  }
  getStats(id:number): Observable<any[]> {
    return this.http.get<any>(`${Config.BASE_URL}ecole/statistiques/`+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
