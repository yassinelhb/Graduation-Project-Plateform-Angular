import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../Models/classe';
import { Config } from '../Models/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }
  getAll(id:number): Observable<any[]> {
    return this.http.get<any>(`${Config.BASE_URL}classe/list/`+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(id:number): Observable<Error> {
    return this.http.post<any>(`${Config.BASE_URL}classe/`+id,null,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  modifier(nom:string,id:number): Observable<Error> {
    let obj = {
      "nom" : nom
    }
    return this.http.put<any>(`${Config.BASE_URL}classe/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  supprimer(id:number): Observable<Error> {
    return this.http.delete<any>(`${Config.BASE_URL}classe/`+id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
