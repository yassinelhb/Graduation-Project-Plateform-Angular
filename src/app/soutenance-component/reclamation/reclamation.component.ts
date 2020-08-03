import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {SoutenanceServiceService} from '../soutenance-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {Reclamation} from '../../Models/Reclamation';
import {User} from '../../Models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {noWhitespaceValidator} from '../../sheetpfe/validator';



@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  user: User;
  ok = false;
  reclamation: Reclamation[];
  Reclamation: FormGroup;
  @Output() hide = new EventEmitter<any>();
  constructor( private httpService: SoutenanceServiceService ,      @Inject(LOCAL_STORAGE) private storage: WebStorageService , private formBuilder: FormBuilder ) { }


  ngOnInit() {
    this.Reclamation = this.formBuilder.group(
      {
        textRec: ['', [ Validators.required, Validators.minLength(20) , noWhitespaceValidator , Validators.maxLength(200)]],
        etudiant: [''],
        soutenance: [''],
        dateAjout: ['']
      }
    );
  }

  get getText()
  {
     return this.Reclamation.get('textRec');
  }
  getIdEtudiant()
  {
  this.Reclamation.get('etudiant');
  }
  getIdSoutenance()
  {
    this.Reclamation.get('soutenance');
  }
  getDateAJout()
  {
    this.Reclamation.get('dateAjout');
  }


  addReclamation() {
    if (confirm("voulez vous vraiment ajouter une reclamation ?")) {
  this.httpService.ajouterReclamation(this.Reclamation.value).subscribe(
    success => {
      if (success) {
        this.ok = true;
        this.hide.emit();
        window.alert("votre reclamation a ete ajouter avec succés");
        window.location.reload();

      }
    }
  );
    }
  }



}
