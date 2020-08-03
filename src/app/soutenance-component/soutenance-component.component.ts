import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {SoutenanceServiceService} from './soutenance-service.service';
import {Soutenance} from '../Models/soutenance';
import {User} from '../Models/user';
import {Notification} from '../Models/notification';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VERSION , MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {ReclamationComponent} from './reclamation/reclamation.component';



@Component({
  selector: 'app-soutenance-component',
  templateUrl: './soutenance-component.component.html',
  styleUrls: ['./soutenance-component.component.scss'],
  providers: [SoutenanceServiceService]
})
export class SoutenanceComponentComponent implements OnInit {


  user: User;
  soutenance: Soutenance[];
  allsoutenance: Soutenance[];
  stat: Soutenance[];
  note: Soutenance[];
  data: string;
  table: any[];
  submitted = false;
  ajout =  false;
  click = false;
  afiche = false;
  s: Soutenance = new Soutenance();
  notif: Notification = new Notification();
  ajoutNotification: FormGroup;
  AddNote: FormGroup;
  @Output() hide = new EventEmitter<any>();
  notification: Notification[];
  notifications: Notification[];


  constructor( private httpService: SoutenanceServiceService ,      @Inject(LOCAL_STORAGE) private storage: WebStorageService , private formBuilder: FormBuilder , private dialog: MatDialog  ) {

    this.user = this.storage.get('user');
    this.httpService.getNotificationUser(this.user.id).subscribe(
      data => {
        this.notification = data;
        console.log(this.notification);
      }
    );
    if (this.user.role === 'Admin' || this.user.role === 'Enseignant' || this.user.role === 'ChefDeDepartement' || this.user.role === 'DirecteurDesStages') {
      this.httpService.getsoutenanceNonNote().subscribe(data => {
        this.soutenance = data;
        console.log(this.soutenance);
      });

      this.httpService.getAllSoutenance().subscribe(data => {
        this.allsoutenance = data;
        console.log(this.allsoutenance);
      });
      this.httpService.getStatSoutenance().subscribe(data => {
        this.stat = data;
        console.log(this.stat);
      });
    }
    if (this.user.role === 'Etudiant') {
      this.httpService.getsoutenanceEtudiant(this.user.id).subscribe(
        data => {
          this.note = data;
          console.log(this.note);
        });
    }


  }


  consulterRec()
  {
    this.afiche = true;
  }


  afficherAjoutNote()
  {
    this.submitted = true;
  }
  notify()
  {
    this.click = true;
    this.afiche = true;
  }

  ajouterNote(idS,notee,note)
  {
    this.s = {
      id: idS.value,
      notee: notee.value,
      note: note.value,
      description: null,
      titre: null,
      dateSoutenance: null,
      heureSoutenance: null,
      noteSoutenance: 0,
      salle: null
    };
    this.httpService.ajouterNote(idS,notee,note).subscribe(
      data =>
      {
        this.soutenance.push(this.s);
        console.log(this.soutenance);


      }
    );
    this.ajout = true;
    this.submitted = true;
    if ( this.AddNote.valid) {
      if ((notee.value - note.value) > 3 ){
        window.alert("il y a un conflit dans la note que vous avez ajouté , la direction traitera ce probleme et vous communiquera par mail");
        window.location.replace('/soutenanceNonNote');

      }
      if (notee.value - note.value <= 3 ) {
        window.alert("la note a ete ajouté avec succés");
        window.location.replace('/soutenanceNonNote');
      }
    }

  }



  ngOnInit() {
    this.ajoutNotification = this.formBuilder.group(
      {
        etat: [''],
        text: [''],
        idEnseignant: ['']
      }
    );

    this.AddNote = this.formBuilder.group(
      {
         ids: [''],
        note1: ['', [ Validators.required , Validators.max(20) , Validators.min(0) ] ],
        note2: ['', [ Validators.required , Validators.max(20) , Validators.min(0) ] ]
      }
    );
  }
  get note1()
  {
    return this.AddNote.get('note1');
  }
  get note2()
  {
    return this.AddNote.get('note2');
  }

  getEtat()
  {
    this.ajoutNotification.get('etat');
  }
  getText()
  {
    this.ajoutNotification.get('text');
  }
  getIdEnseignant()
  {
    this.ajoutNotification.get('idEnseignant');
  }


  ajoutNotif(idSoutenance){
    this.httpService.addNotification(this.ajoutNotification.value,idSoutenance).subscribe(    success => {
      if (success) {
        this.hide.emit();
        window.alert("l'enseignant sera notifier");
        window.location.replace('/soutenanceNonNote');

      }
    });
  }



  openDialog() {
    let dialogRef  = this.dialog.open(ReclamationComponent , {
      height: '500px',
      width: '700px',

    }) ;
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    });
  }


}
