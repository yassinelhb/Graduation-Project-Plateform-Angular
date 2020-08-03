import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from './Question';
import {Observable} from 'rxjs';
import {Reponse} from './Response';

@Injectable({
  providedIn: 'root'
})
export class ResponseSrvice {
  public  ReponseUserUrl = 'http://localhost:9080/4twin3-osp-pfe-web/rest/Reponse';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  ajouterReponse(reponse: number, id_Question): Observable<any> {
    return this.http.post(this.ReponseUserUrl + '?idq=' + id_Question, reponse, this.httpOptions );
  }
}
