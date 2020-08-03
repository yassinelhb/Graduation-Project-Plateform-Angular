import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Soutenance } from '../Models/soutenance';
import { Config } from '../Models/config';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Observable, observable} from 'rxjs';
import {Reclamation} from '../Models/Reclamation';
import {User} from '../Models/user';
import {Notification} from '../Models/notification';


@Injectable({
  providedIn: 'root'
})
export class SoutenanceServiceService {



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient , @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  getAllReclamation()
  {
    return this.http.get<Reclamation[]>(`${Config.BASE_URL}reclamation/getAllReclamation`);
  }

   getsoutenanceNonNote() {
      return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/note`);
  }

  getAllSoutenance()
  {
    return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/soutenance`);
  }

  getStatSoutenance()
  {
    return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/note/moyenne`);
  }

  getsoutenanceEtudiant(id: number)
  {
    return this.http.get<Soutenance[]>(`${Config.BASE_URL}soutenance/getById/`+id);
  }

  getReclamationEtudiant(nom: string , prenom: string)
  {
   return this.http.get<Reclamation[]>(`${Config.BASE_URL}reclamation/getById/`+nom+`/`+prenom);
  }

  getNotificationUser(id: number)
  {
    return this.http.get<Notification[]>(`${Config.BASE_URL}notif/getById/`+id);
  }

  getNombreNotification(id: number)
  {
    return this.http.get<Notification[]>(`${Config.BASE_URL}notif/getNombre/`+id);
  }

  getAllNotification()
  {
    return this.http.get<Notification[]>(`${Config.BASE_URL}notif/get`);
  }

  ajouterNote(idS , note , notee)
  {
    const body = {};
    return this.http.put<Soutenance[]>(`${Config.BASE_URL}soutenance/test/`+idS.value+`/`+note.value+`/`+notee.value , body );
  }

  traiterNotification(idNotification)
  {
    const body = {
      'idNotification' : idNotification,
      'etat': 'traiter'
    }
    console.log(body);
    return this.http.put<any>(`${Config.BASE_URL}notif/traiter` , body);
  }

  ajouterReclamation(Reclamation)
  {
    const obj = {
      'textRec': Reclamation['textRec'],
      'etudiant' : { 'id': this.storage.get('user').id , 'nom': this.storage.get('user').nom , 'prenom': this.storage.get('user').prenom },
      'dateAjout': Date.now(),
      'soutenance' : { 'id': this.storage.get('user').id }
  }
    console.log(obj);
    return this.http.post<any>(`${Config.BASE_URL}reclamation/ajout` , obj , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  envoiMail()
  {
    const obj = {
      'message': 'il ya un conflit dans la note que vous avez ajouté , la difference entre les deux notes des jurys est superieure à 3 , veuillez s il vous plait corriger cet erreur',
      'toUserEmail': this.storage.get('user').email ,
      'type': 'Approved',
      'subject': 'Conflit Note'
    }
    console.log(obj);
    return this.http.post<any>(`${Config.BASE_URL}mailsender` , obj , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  deleteReclamation ( id: number , idU: number)
  {
    return this.http.delete<Reclamation[]>(`${Config.BASE_URL}reclamation/delete/`+id+`/`+idU);
  }

  addNotification(ajoutNotification,idSoutenance : number)
  {
    const  obj = {
      'text': "vous n avez pas encore attribuer une note a la soutenance d id: "+idSoutenance+" , Veuiller svp régler cet etat",
      'user': { 'id': 26 },
      'etat': null
    }
    console.log(obj);
    return this.http.post<any>(`${Config.BASE_URL}notif/ajout` , obj , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}

