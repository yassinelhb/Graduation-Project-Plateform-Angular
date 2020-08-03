import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Config } from '../Models/config';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Subject<User> = new Subject();
  loggedIn: Subject<boolean> = new Subject();
  image: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    let obj = {
      "email": email,
      "password": password
    }
    return this.http.post<any>(`${Config.BASE_URL}authentication`, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  listAdmin(): Observable<Object> {
    return this.http.get<any>(`${Config.BASE_URL}admin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });
  }
  broadcastLoginChange(user: User) {
    this.user.next(user);
  }
  broadcastLoggedInChange(val: boolean) {
    this.loggedIn.next(val);
  }
  broadcastImageChange(image: any) {
    this.image.next(image);
  }
  getImage(): Observable<Blob> {
    return this.http.get<Blob>(`${Config.BASE_URL}ecole/image`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept':'application/octet-stream'
      }), withCredentials: true,responseType: "blob" as "json"
    });
  }
}
