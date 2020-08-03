import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enseignant } from '../Models/enseignant';
import { Config } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class EnseignantsService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any[]> {
    return this.http.get<any>(`${Config.BASE_URL}enseignant/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom:string,prenom:string,email:string,id:number): Observable<Error> {
    let obj = {
      "nom" : nom,
      "prenom" : prenom,
      "email" : email
    }
    return this.http.post<any>(`${Config.BASE_URL}enseignant/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  supprimer(id:number): Observable<Error> {
    return this.http.delete<any>(`${Config.BASE_URL}enseignant/`+id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  affecterDirecteur(idEnseignant:number,idSite:number): Observable<Error> {
    return this.http.post<any>(`${Config.BASE_URL}directeurDeStages?idEnseignant=`+idEnseignant+`&idSite=`+idSite,null,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
