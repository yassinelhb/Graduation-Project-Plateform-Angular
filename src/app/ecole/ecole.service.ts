import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecole } from '../Models/ecole';
import { Config } from '../Models/config';
import { Error } from '../Models/error';

@Injectable({
  providedIn: 'root'
})
export class EcoleService {

  constructor(private http: HttpClient) { }
  getEcole(): Observable<Ecole> {
    return this.http.get<any>(`${Config.BASE_URL}admin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouter(nom:string,adresse:string): Observable<any> {
    let obj = {
      "nom" : nom,
      "adresse" : adresse,
    }
    return this.http.post<any>(`${Config.BASE_URL}ecole`,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  modifier(nom:string,adresse:string,id:number): Observable<any> {
    let obj = {
      "nom" : nom,
      "adresse" : adresse,
    }
    return this.http.put<any>(`${Config.BASE_URL}ecole/`+id,obj,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  ajouterImage(fileData: File): Observable<Error> {
    const formData = new FormData();
    formData.append('image', fileData);
      return this.http.post<any>(`${Config.BASE_URL}ecole/image`,formData,{
        headers: new HttpHeaders({
        }), withCredentials: true
      });
  }
  ajouterDonnees(fileData: File,adresse:string,nom:string): Observable<Error> {
    const formData = new FormData();
    formData.append('file', fileData);
    formData.append('adresse', adresse);
    formData.append('nom', nom);
      return this.http.post<any>(`${Config.BASE_URL}import`,formData,{
        headers: new HttpHeaders({
        }), withCredentials: true
      });
  }
  downloadFile(): Observable<Blob>{		
		return this.http.get<Blob>(`${Config.BASE_URL}import/export`, {
      headers: new HttpHeaders({
      }), withCredentials: true,responseType: "blob" as "json"
    });
   }
}
