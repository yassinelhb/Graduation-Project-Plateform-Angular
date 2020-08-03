import { Component, OnInit, Input } from '@angular/core';
import { Etudiant } from '../Models/etudiant';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';
import { EtudiantsService } from './etudiants.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Error } from '../Models/error';
import { Location } from '@angular/common';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss']
})
export class EtudiantsComponent implements OnInit {
  loading=true;
  etudiants:Etudiant[]=[];
  classeId:number;
  hasEcole=true;
  constructor(private location: Location,private route: ActivatedRoute, private router: Router,private etudiantsService: EtudiantsService, private modalService: NgbModal) { 
    
  }
  goBack() {
    this.location.back();
  } 
  getEtudiants(){
    this.loading = true;
    this.etudiantsService.getAll(this.classeId).subscribe(success => {
      this.etudiants = success;
      this.loading = false;
      this.etudiants.sort((a,b) => {
        if (a.id>b.id) return 1;
        else if (a.id<b.id) return -1;
        else return 0;
      })
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.classeId = params['id']; 
      if (isUndefined(this.classeId)) this.router.navigate(['/sites']);
    });
    console.log(this.classeId);
    if (isUndefined(this.classeId)) this.router.navigate(['/sites']);
    this.getEtudiants();
  }
  supprimer(etudiant: Etudiant) {
    this.etudiantsService.supprimer(etudiant.id).subscribe((success) => {
      this.getEtudiants();
    })
  }

  openForm() {
    const modal = this.modalService.open(NgbdModalEtudiant);
    modal.componentInstance.update = false;
    modal.componentInstance.classeId = this.classeId;
    modal.result.then((added) => {
      if (added === "added") {
        this.getEtudiants();
      }
    })
  }

  openFormUpdate(etudiant: Etudiant) {
    const modal = this.modalService.open(NgbdModalEtudiant);
    modal.componentInstance.update = true;
    modal.componentInstance.etudiant = etudiant;
    modal.result.then((added) => {
      if (added === "added") {
        this.getEtudiants();
      }
    })
  }
  

}
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title" *ngIf="!update">Ajouter un département</h4>
    <h4 class="modal-title" id="modal-title" *ngIf="update">Modifier un département</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form class="forms-sample" [formGroup]="etudiantForm">
    <div class="form-group">
      <label for="exampleInputEmail1">Nom</label>
      <input type="text" class="form-control" id="nom" formControlName="nom" placeholder="Nom" [ngClass]="{'is-invalid':nomErrors.length>0}" value="nom">
      <div class="invalid-feedback" *ngFor="let error of nomErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Prenom</label>
      <input type="text" class="form-control" id="prenom" formControlName="prenom" placeholder="Prenom" [ngClass]="{'is-invalid':prenomErrors.length>0}" value="prenom">
      <div class="invalid-feedback" *ngFor="let error of prenomErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group" *ngIf="!update">
      <label for="exampleInputEmail1">Email</label>
      <input type="text" class="form-control" id="email" formControlName="email" placeholder="Email" [ngClass]="{'is-invalid':emailErrors.length>0}" value="email">
      <div class="invalid-feedback" *ngFor="let error of emailErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group" *ngIf="!update">
      <label for="exampleInputEmail1">Identifiant</label>
      <input type="text" class="form-control" id="identifiant" formControlName="identifiant" placeholder="Identifiant" [ngClass]="{'is-invalid':identifiantErrors.length>0}" value="identifiant">
      <div class="invalid-feedback" *ngFor="let error of identifiantErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    </form>
  </div>
  <div class="modal-footer">
    <div class="spinner-border" role="status" *ngIf="loading">
      <span class="sr-only">Chargement...</span>
    </div>
    <button type="button" class="btn btn-danger" (click)="modal.dismiss('cancel click')" [disabled]="loading">Annuler</button>
    <button type="button" class="btn btn-success" (click)="confirmer()" [disabled]="loading">Confirmer</button>
  </div>
  `
})
export class NgbdModalEtudiant implements OnInit {
  ngOnInit(): void {
    console.log(this.etudiant);
    this.initForm();
  }
  @Input() public update;
  @Input() public etudiant;
  @Input() public classeId;
  etudiantForm: FormGroup;
  nomErrors: Error[] = [];
  prenomErrors: Error[] = [];
  emailErrors: Error[] = [];
  identifiantErrors: Error[] = [];
  errors: Error[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private etudiantsService: EtudiantsService) {
  }
  initForm() {
    if (this.update) {
      console.log(this.etudiant);
      this.etudiantForm = this.formBuilder.group({
        nom: [this.etudiant.nom],
        prenom: [this.etudiant.prenom]
      })
    }
    else {
      this.etudiantForm = this.formBuilder.group({
        nom: [''],
        prenom: [''],
        email: [''],
        identifiant: ['']
      })
    }
  }
  get SiteForm() {
    return this.etudiantForm;
  }
  get nom() {
    return this.etudiantForm.get("nom");
  }
  get prenom() {
    return this.etudiantForm.get("prenom");
  }
  get email() {
    return this.etudiantForm.get("email");
  }
  get identifiant() {
    return this.etudiantForm.get("identifiant");
  }
  confirmer() {
    this.loading = true;
    if (this.update) {
      this.etudiantsService.modifier(this.nom.value,this.prenom.value, this.etudiant.id).subscribe(
        success => {
          console.log(success);
          this.modal.close("added");
        },
        error => {
          console.log(error);
          this.errors = error.error;
          this.nomErrors = this.errors.filter(e => e.propertyPath === "nom");
          this.prenomErrors = this.errors.filter(e => e.propertyPath === "prenom");
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
    }
    else {
      this.etudiantsService.ajouter(this.nom.value,this.prenom.value,this.identifiant.value,this.email.value,this.classeId).subscribe(
        success => {
          console.log(success);
          this.modal.close("added");
        },
        error => {
          console.log(error);
          this.errors = error.error;
          this.nomErrors = this.errors.filter(e => e.propertyPath === "nom");
          this.prenomErrors = this.errors.filter(e => e.propertyPath === "prenom");
          this.emailErrors = this.errors.filter(e => e.propertyPath === "email");
          this.identifiantErrors = this.errors.filter(e => e.propertyPath === "identifiant");
          this.loading = false;
          this.modal.close("added");
        },
        () => {
          this.loading = false;
        }
      )
    }

  }
}