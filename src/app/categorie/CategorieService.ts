import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from '../Models/categorie';
import {Question} from '../forum/Question';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  public  QuestionUserUrl = 'http://localhost:9080/4twin3-osp-pfe-web/rest/Categorie';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  ajoutercat(cat: Categorie): Observable<any> {
    return this.http.post(this.QuestionUserUrl + `/` + this.storage.get('user').id, cat, this.httpOptions );
  }
  getcat() {
    return this.http.get<Categorie[]>(this.QuestionUserUrl);
  }
  deletecat(id_cat) {
    return this.http.delete(this.QuestionUserUrl + '/' + id_cat); }
}
