import { Component, OnInit, Input } from '@angular/core';
import { Departement } from '../Models/departement';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';
import { DepartementsService } from './departements.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Error } from '../Models/error';
import { Location } from '@angular/common';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.scss']
})
export class DepartementsComponent implements OnInit {
  loading=true;
  departements:Departement[]=[];
  siteId:number;
  hasEcole=true;
  constructor(private location: Location,private route: ActivatedRoute, private router: Router,private departementsService: DepartementsService, private modalService: NgbModal) { 
    
  }
  goBack() {
    this.location.back();
  } 
  getDepartements(){
    this.loading = true;
    this.departementsService.getAll(this.siteId).subscribe(success => {
      this.departements = success;
      this.loading = false;
      this.departements.sort((a,b) => {
        if (a.id>b.id) return 1;
        else if (a.id<b.id) return -1;
        else return 0;
      })
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.siteId = params['id']; 
      if (isUndefined(this.siteId)) this.router.navigate(['/sites']);
    });
    console.log(this.siteId);
    if (isUndefined(this.siteId)) this.router.navigate(['/sites']);
    this.getDepartements();
  }
  supprimer(departement: Departement) {
    this.departementsService.supprimer(departement.id).subscribe((success) => {
      this.getDepartements();
    })
  }

  details(departement: Departement) {
    this.router.navigate(['/specialites/'+departement.id]);
  }

  openForm() {
    const modal = this.modalService.open(NgbdModalDepartement);
    modal.componentInstance.update = false;
    modal.componentInstance.siteId = this.siteId;
    modal.result.then((added) => {
      if (added === "added") {
        this.getDepartements();
      }
    })
  }

  openFormUpdate(departement: Departement) {
    const modal = this.modalService.open(NgbdModalDepartement);
    modal.componentInstance.update = true;
    modal.componentInstance.departement = departement;
    modal.result.then((added) => {
      if (added === "added") {
        this.getDepartements();
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
    <form class="forms-sample" [formGroup]="departementForm">
    <div class="form-group">
      <label for="exampleInputEmail1">Nom</label>
      <input type="text" class="form-control" id="nom" formControlName="nom" placeholder="Nom" [ngClass]="{'is-invalid':nomErrors.length>0}" value="nom">
      <div class="invalid-feedback" *ngFor="let error of nomErrors;">
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
export class NgbdModalDepartement implements OnInit {
  ngOnInit(): void {
    console.log(this.departement);
    this.initForm();
  }
  @Input() public update;
  @Input() public departement;
  @Input() public siteId;
  departementForm: FormGroup;
  nomErrors: Error[] = [];
  errors: Error[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private departementsService: DepartementsService) {
  }
  initForm() {
    if (this.update) {
      console.log(this.departement);
      this.departementForm = this.formBuilder.group({
        nom: [this.departement.nom]
      })
    }
    else {
      this.departementForm = this.formBuilder.group({
        nom: ['']
      })
    }
  }
  get SiteForm() {
    return this.departementForm;
  }
  get nom() {
    return this.departementForm.get("nom");
  }
  confirmer() {
    this.loading = true;
    if (this.update) {
      this.departementsService.modifier(this.nom.value, this.departement.id).subscribe(
        success => {
          console.log(success);
          this.modal.close("added");
        },
        error => {
          console.log(error);
          this.errors = error.error;
          this.nomErrors = this.errors.filter(e => e.propertyPath === "nom");
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
    }
    else {
      this.departementsService.ajouter(this.nom.value,this.siteId).subscribe(
        success => {
          console.log(success);
          this.modal.close("added");
        },
        error => {
          console.log(error);
          this.errors = error.error;
          this.nomErrors = this.errors.filter(e => e.propertyPath === "nom");
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