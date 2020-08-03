import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../Models/departement';
import { Config } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class DepartementsService {

  constructor(private http: HttpClient) { }
  getAll(id:number): Observable<Departement[]> {
    return this.http.get<any>(`${Config.BASE_URL}departement/list/`+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom:string,id:number): Observable<Error> {
    let obj = {
      "nom" : nom
    }
    return this.http.post<any>(`${Config.BASE_URL}departement/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  modifier(nom:string,id:number): Observable<Error> {
    let obj = {
      "nom" : nom
    }
    return this.http.put<any>(`${Config.BASE_URL}departement/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  supprimer(id:number): Observable<Error> {
    return this.http.delete<any>(`${Config.BASE_URL}departement/`+id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
