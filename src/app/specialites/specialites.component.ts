import { Component, OnInit, Input } from '@angular/core';
import { Specialite } from '../Models/specialite';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'util';
import { SpecialitesService } from './specialites.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Error } from '../Models/error';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.scss']
})
export class SpecialitesComponent implements OnInit {
  loading=true;
  specialites:Specialite[]=[];
  siteId:number;
  hasEcole=true;
  constructor(private location: Location,private route: ActivatedRoute, private router: Router,private specialitesService: SpecialitesService, private modalService: NgbModal) { 
    
  }
  goBack() {
    this.location.back();
  } 
  getSpecialites(){
    this.loading = true;
    this.specialitesService.getAll(this.siteId).subscribe(success => {
      this.specialites = success;
      this.loading = false;
      this.specialites.sort((a,b) => {
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
    this.getSpecialites();
  }
  supprimer(specialite: Specialite) {
    this.specialitesService.supprimer(specialite.id).subscribe((success) => {
      this.getSpecialites();
    })
  }

  details(specialite: Specialite) {
    this.router.navigate(['/classes/'+specialite.id]);
  }

  openForm() {
    const modal = this.modalService.open(NgbdModalSpecialite);
    modal.componentInstance.update = false;
    modal.componentInstance.siteId = this.siteId;
    modal.result.then((added) => {
      if (added === "added") {
        this.getSpecialites();
      }
    })
  }

  openFormUpdate(specialite: Specialite) {
    const modal = this.modalService.open(NgbdModalSpecialite);
    modal.componentInstance.update = true;
    modal.componentInstance.specialite = specialite;
    modal.result.then((added) => {
      if (added === "added") {
        this.getSpecialites();
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
    <form class="forms-sample" [formGroup]="specialiteForm">
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
export class NgbdModalSpecialite implements OnInit {
  ngOnInit(): void {
    console.log(this.specialite);
    this.initForm();
  }
  @Input() public update;
  @Input() public specialite;
  @Input() public siteId;
  specialiteForm: FormGroup;
  nomErrors: Error[] = [];
  errors: Error[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private specialitesService: SpecialitesService) {
  }
  initForm() {
    if (this.update) {
      console.log(this.specialite);
      this.specialiteForm = this.formBuilder.group({
        nom: [this.specialite.nom]
      })
    }
    else {
      this.specialiteForm = this.formBuilder.group({
        nom: ['']
      })
    }
  }
  get SiteForm() {
    return this.specialiteForm;
  }
  get nom() {
    return this.specialiteForm.get("nom");
  }
  confirmer() {
    this.loading = true;
    if (this.update) {
      this.specialitesService.modifier(this.nom.value, this.specialite.id).subscribe(
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
      this.specialitesService.ajouter(this.nom.value,this.siteId).subscribe(
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