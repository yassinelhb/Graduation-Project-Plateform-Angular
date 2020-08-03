import { Component, OnInit, Input, Inject } from '@angular/core';
import { Enseignant } from '../Models/enseignant';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';
import { EnseignantsService } from './enseignants.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Error } from '../Models/error';
import { Location } from '@angular/common';
import { SitesService } from '../siteModule/sites/sites.service';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Site } from '../Models/site';

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.scss']
})
export class EnseignantsComponent implements OnInit {

  loading = true;
  enseignants: any[] = [];
  sites: Site[] = [];
  hasEcole = true;
  constructor(private sitesService: SitesService, private location: Location, private route: ActivatedRoute,
     private router: Router, private enseignantsService: EnseignantsService, private modalService: NgbModal, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }
  goBack() {
    this.location.back();
  }
  getEnseignants(){
    this.loading = true;
    this.enseignantsService.getAll().subscribe(success => {
      this.enseignants = success;
      this.loading = false;
      this.enseignants.sort((a,b) => {
        if (a.id>b.id) return 1;
        else if (a.id<b.id) return -1;
        else return 0;
      })
    })
  }
  ngOnInit() {
    if (this.storage.get("user").ecole !== null) {
      this.getEnseignants();
      this.sitesService.getAll(this.storage.get("user").ecole.id).subscribe((success) => {
        this.sites = success;
        this.loading = false;
      })
    }
    else {
      this.hasEcole = false;
      this.loading = false;
    }
  }
  supprimer(enseignant: Enseignant) {
    this.enseignantsService.supprimer(enseignant.id).subscribe((success) => {
      this.getEnseignants();
    })
  }
  openForm() {
    const modal = this.modalService.open(NgbdModalEnseignant);
    modal.componentInstance.update = false;
    modal.componentInstance.sites = this.sites;
    modal.result.then((added) => {
      if (added === "added") {
        this.getEnseignants();
      }
    })
  }

  openFormAffecter(enseignant:any) {
    this.enseignantsService.affecterDirecteur(enseignant.id, enseignant.site.id).subscribe(
      success => {
        console.log(success);
        this.getEnseignants();
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    )
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
    <form class="forms-sample" [formGroup]="enseignantForm">
    <div class="form-group">
      <label for="exampleInputEmail1">Nom</label>
      <input type="text" class="form-control" id="nom" formControlName="nom" placeholder="Nom" [ngClass]="{'is-invalid':nomErrors.length>0}">
      <div class="invalid-feedback" *ngFor="let error of nomErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Prenom</label>
      <input type="email" class="form-control" id="prenom" formControlName="prenom" placeholder="Prenom" [ngClass]="{'is-invalid':prenomErrors.length>0}">
      <div class="invalid-feedback" *ngFor="let error of prenomErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Adresse Email</label>
      <input type="email" class="form-control" id="email" formControlName="email" placeholder="Adresse Email" [ngClass]="{'is-invalid':emailErrors.length>0}">
      <div class="invalid-feedback" *ngFor="let error of emailErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Mot de passe</label>
      <input type="password" class="form-control" id="password" formControlName="password" placeholder="Mot de passe" [ngClass]="{'is-invalid':passwordErrors.length>0}">
      <div class="invalid-feedback" *ngFor="let error of passwordErrors;">
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
export class NgbdModalEnseignant implements OnInit {
  ngOnInit(): void {
    console.log(this.enseignant);
    this.initForm();
  }
  @Input() public update;
  @Input() public enseignant;
  enseignantForm: FormGroup;
  nomErrors: Error[] = [];
  prenomErrors: Error[] = [];
  emailErrors: Error[] = [];
  passwordErrors: Error[] = [];
  errors: Error[] = [];
  sites: Site[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private enseignantsService: EnseignantsService) {
  }
  initForm() {
    if (this.update) {
      console.log(this.enseignant);
      this.enseignantForm = this.formBuilder.group({
        nom: [this.enseignant.nom]
      })
    }
    else {
      this.enseignantForm = this.formBuilder.group({
        nom: [''],
        prenom: [''],
        email: [''],
        password: [''],
        site: [this.sites[0]]
      })
      this.enseignantForm.controls["site"].setValue(this.sites[0],{onlySelf: true});
    }
  }
  get EnseignantForm() {
    return this.enseignantForm;
  }
  get nom() {
    return this.enseignantForm.get("nom");
  }
  get prenom() {
    return this.enseignantForm.get("prenom");
  }
  get email() {
    return this.enseignantForm.get("email");
  }
  get password() {
    return this.enseignantForm.get("password");
  }
  get site() {
    return this.enseignantForm.get("site");
  }
  confirmer() {
    this.loading = true;
    if (this.update) {
    }
    else {
      this.enseignantsService.ajouter(this.nom.value, this.prenom.value, this.email.value, this.site.value.id).subscribe(
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
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
    }

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
    <form class="forms-sample" [formGroup]="enseignantForm">
    <div class="form-group">
      <label for="exampleInputPassword1">Site</label>
      <select class="form-control" id="site" formControlName="site">
        <option *ngFor="let site of sites;" [ngValue]="site">{{site.nom}}</option>
      </select>
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
export class NgbdModalDirecteur implements OnInit {
  ngOnInit(): void {
    console.log(this.enseignant);
    this.initForm();
  }
  @Input() public update;
  @Input() public enseignant;
  enseignantForm: FormGroup;
  errors: Error[] = [];
  sites: Site[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private enseignantsService: EnseignantsService) {
  }
  initForm() {
    if (this.update) {
      console.log(this.enseignant);
      this.enseignantForm = this.formBuilder.group({
        nom: [this.enseignant.nom]
      })
    }
    else {
      this.enseignantForm = this.formBuilder.group({
        site: [this.sites[0]]
      })
      this.enseignantForm.controls["site"].setValue(this.sites[0],{onlySelf: true});
    }
  }
  get EnseignantForm() {
    return this.enseignantForm;
  }
  get site() {
    return this.enseignantForm.get("site");
  }
  confirmer() {
    this.loading = true;
    if (this.update) {
    }
    else {
      
    }

  }
}