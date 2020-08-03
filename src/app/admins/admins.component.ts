import { Component, OnInit, Input, Output } from '@angular/core';
import { AdminsService } from './admins.service';
import { Admin } from '../Models/admin';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Error } from '../Models/error';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  admins: Admin[];
  loading = true;
  constructor(private adminsService: AdminsService, private modalService: NgbModal) {
    adminsService.getAll().subscribe(success => {
      this.admins = success;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

  openForm() {
    const modal = this.modalService.open(NgbdModalAdmin);
    //modal.componentInstance.update=true;
    modal.result.then((added) => {
      if (added === "added") {
        this.loading = true;
        this.adminsService.getAll().subscribe(success => {
          this.admins = success;
          this.loading = false;
        })
      }
    })
  }

}
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Ajouter un administrateur</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form class="forms-sample" [formGroup]="adminForm">
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
export class NgbdModalAdmin {
  //@Input() update:Boolean;
  //@Input() admin:Admin;
  adminForm: FormGroup;
  nomErrors: Error[] = [];
  prenomErrors: Error[] = [];
  emailErrors: Error[] = [];
  passwordErrors: Error[] = [];
  errors: Error[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private adminsService: AdminsService) {
    this.initForm();
  }
  initForm() {
    this.adminForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: ['']
    })
  }
  get AdminForm() {
    return this.adminForm;
  }
  get nom() {
    return this.adminForm.get("nom");
  }
  get prenom() {
    return this.adminForm.get("prenom");
  }
  get email() {
    return this.adminForm.get("email");
  }
  get password() {
    return this.adminForm.get("password");
  }
  confirmer() {
    this.loading = true;
    this.adminsService.ajouter(this.nom.value, this.prenom.value, this.email.value, this.password.value).subscribe(
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
        this.passwordErrors = this.errors.filter(e => e.propertyPath === "plainPassword");
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    )
  }
}
