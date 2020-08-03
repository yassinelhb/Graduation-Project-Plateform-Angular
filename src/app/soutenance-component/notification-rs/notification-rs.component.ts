import {Component, Inject, OnInit} from '@angular/core';
import {SoutenanceServiceService} from '../soutenance-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {Notification} from '../../Models/notification';
@Component({
  selector: 'app-notification-rs',
  templateUrl: './notification-rs.component.html',
  styleUrls: ['./notification-rs.component.scss']
})
export class NotificationRSComponent implements OnInit {

  n: Notification = new Notification();
  user: User;
  notification: Notification[];
  notif: Notification[];
  constructor( private httpService: SoutenanceServiceService ,    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.user = this.storage.get('user');
    this.httpService.getNotificationUser(this.user.id).subscribe(
      data => {
        this.notification = data;
        console.log(this.notification);
      }
    );
    if (this.user.role === 'Admin' || this.user.role === 'Enseignant')
    {
      this.httpService.getAllNotification().subscribe(
        data => {
          this.notif = data;
          console.log(this.notif);
        }
      );
    }

  }

  ngOnInit() {
  }
  traiterNotificationConflit(idNotification){
    this.httpService.traiterNotification(idNotification).subscribe(
      data => {
        this.httpService.envoiMail().subscribe();
        this.n = data;
        console.log(this.n);
        window.alert("notification Traiter");
        window.location.replace('/soutenanceNonNote');

      }
    );
    if (this.user.role === 'Etudiant')
    {
      window.location.replace('/soutenanceNonNote');
    }
  }

  traiterNotification(idNotificaiton)
  {
  this.httpService.traiterNotification(idNotificaiton).subscribe(
    data => {
      this.n = data;
      console.log(this.n);
      window.alert("notification Reclamation Traiter");
    }
  );

    if (this.user.role === 'Enseignant' || this.user.role === 'Admin')
    {
      window.location.replace('/soutenanceNonNote/displayReclamation/'+idNotificaiton);
    }


  }

}
