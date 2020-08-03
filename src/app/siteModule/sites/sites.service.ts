import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../../Models/site';
import { Config } from '../../Models/config';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private http: HttpClient) { }
  getAll(id:number): Observable<Site[]> {
    return this.http.get<any>(`${Config.BASE_URL}site/list/`+id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom:string,adresse:string): Observable<Error> {
    let obj = {
      "nom" : nom,
      "adresse" : adresse,
    }
    return this.http.post<any>(`${Config.BASE_URL}site`,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  modifier(nom:string,adresse:string,id:number): Observable<Error> {
    let obj = {
      "nom" : nom,
      "adresse" : adresse,
    }
    return this.http.put<any>(`${Config.BASE_URL}site/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  supprimer(id:number): Observable<Error> {
    return this.http.delete<any>(`${Config.BASE_URL}site/`+id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
