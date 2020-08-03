import {Component, Inject, OnInit} from '@angular/core';
import {SoutenanceServiceService} from '../soutenance-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Reclamation} from '../../Models/Reclamation';
import {User} from '../../Models/user';
import {ActivatedRoute} from '@angular/router';
import {Notification} from '../../Models/notification';

@Component({
  selector: 'app-reclamation-display',
  templateUrl: './reclamation-display.component.html',
  styleUrls: ['./reclamation-display.component.scss']
})
export class ReclamationDisplayComponent implements OnInit {

  idNotification: any;
  user: User;
  reclamation: Reclamation[];
  mareclamation: Reclamation[];
  n:  Notification = new Notification();
  constructor( private httpService: SoutenanceServiceService ,    @Inject(LOCAL_STORAGE) private storage: WebStorageService ,  private route: ActivatedRoute) {
    this.user = this.storage.get('user');
    this.httpService.getAllReclamation().subscribe(
      data => {
        this.reclamation = data;
        console.log(this.reclamation);
      });
    this.httpService.getReclamationEtudiant(this.user.nom,this.user.prenom).subscribe(data => {
      this.mareclamation = data;
      console.log(this.mareclamation);
    });
  }

  deleteReclamation(id,idU)
  {
    if (confirm("Avez vous vraiment traiter cette reclamation ? ")) {
      this.httpService.deleteReclamation(id, idU).subscribe(data => console.log("done"));
      this.httpService.traiterNotification(this.idNotification).subscribe(
        data => {
          this.n = data;
          console.log(this.n);
          window.location.replace('/soutenanceNonNote');


        }
      );
    }

  }


  ngOnInit() {
    this.route.params.subscribe(params => { this.idNotification = +params['idNotification']; });
  }

}
