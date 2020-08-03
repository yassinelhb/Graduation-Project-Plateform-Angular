import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../Models/etudiant';
import { Config } from '../Models/config';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {

  constructor(private http: HttpClient) { }
  getAll(id: number): Observable<Etudiant[]> {
    return this.http.get<any>(`${Config.BASE_URL}etudiant/listClasse/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom: string,prenom: string,identifiant: string,email: string, id: number): Observable<Error> {
    let obj = {
      "prenom": prenom,
      "nom": nom,
      "identifiant": identifiant,
      "email": email
    }
    return this.http.post<any>(`${Config.BASE_URL}etudiant/` + id, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  modifier(nom: string,prenom: string, id: number): Observable<Error> {
    let obj = {
      "nom": nom,
      "prenom": prenom
    }
    return this.http.put<any>(`${Config.BASE_URL}etudiant/` + id, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  supprimer(id: number): Observable<Error> {
    return this.http.delete<any>(`${Config.BASE_URL}etudiant/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
}
