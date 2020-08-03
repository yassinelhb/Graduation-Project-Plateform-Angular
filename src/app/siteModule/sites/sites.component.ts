import { Component, OnInit, Inject, Input } from '@angular/core';
import { SitesService } from './sites.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminsService } from '../../admins/admins.service';
import { Error } from '../../Models/error';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Site } from '../../Models/site';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  loading = true;
  sites: Site[] = [];
  hasEcole = true;

  constructor(private sitesService: SitesService, private router: Router, private modalService: NgbModal, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    if (storage.get("user").ecole !== null) {
      this.getSites();
    }
    else {
      this.hasEcole = false;
      this.loading = false;
    }
  }
  getSites(){
    this.loading = true;
    this.sitesService.getAll(this.storage.get("user").ecole.id).subscribe(success => {
      this.sites = success;
      this.loading = false;
      this.sites.sort((a,b) => {
        if (a.id>b.id) return 1;
        else if (a.id<b.id) return -1;
        else return 0;
      })
    })
  }
  supprimer(site: Site) {
    this.sitesService.supprimer(site.id).subscribe((success) => {
      this.getSites();
    })
  }

  details(site: Site) {
    this.router.navigate(['/departements/'+site.id]);
  }

  openForm() {
    const modal = this.modalService.open(NgbdModalSite);
    modal.componentInstance.update = false;
    modal.result.then((added) => {
      if (added === "added") {
        this.getSites();
      }
    })
  }

  openFormUpdate(site: Site) {
    console.log(site)
    const modal = this.modalService.open(NgbdModalSite);
    modal.componentInstance.update = true;
    modal.componentInstance.site = site;
    modal.result.then((added) => {
      if (added === "added") {
        this.getSites();
      }
    })
  }
  ngOnInit() {
  }

}
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Ajouter un site</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form class="forms-sample" [formGroup]="siteForm">
    <div class="form-group">
      <label for="exampleInputEmail1">Nom</label>
      <input type="text" class="form-control" id="nom" formControlName="nom" placeholder="Nom" [ngClass]="{'is-invalid':nomErrors.length>0}" value="nom">
      <div class="invalid-feedback" *ngFor="let error of nomErrors;">
        {{error.errorMessage}}
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Adresse</label>
      <input type="email" class="form-control" id="adresse" formControlName="adresse" placeholder="Adresse" [ngClass]="{'is-invalid':adresseErrors.length>0}" value="adresse">
      <div class="invalid-feedback" *ngFor="let error of adresseErrors;">
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
export class NgbdModalSite implements OnInit {
  ngOnInit(): void {
    console.log(this.site);
    this.initForm();
  }
  @Input() public update;
  @Input() public site;
  siteForm: FormGroup;
  nomErrors: Error[] = [];
  adresseErrors: Error[] = [];
  errors: Error[] = [];
  loading = false;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private sitesService: SitesService) {
  }
  initForm() {
    if (this.update) {
      console.log(this.site);
      this.siteForm = this.formBuilder.group({
        nom: [this.site.nom],
        adresse: [this.site.adresse]
      })
    }
    else {
      this.siteForm = this.formBuilder.group({
        nom: [''],
        adresse: ['']
      })
    }
  }
  get SiteForm() {
    return this.siteForm;
  }
  get nom() {
    return this.siteForm.get("nom");
  }
  get adresse() {
    return this.siteForm.get("adresse");
  }
  confirmer() {
    this.loading = true;
    if (this.update) {
      this.sitesService.modifier(this.nom.value, this.adresse.value, this.site.id).subscribe(
        success => {
          console.log(success);
          this.modal.close("added");
        },
        error => {
          console.log(error);
          this.errors = error.error;
          this.nomErrors = this.errors.filter(e => e.propertyPath === "nom");
          this.adresseErrors = this.errors.filter(e => e.propertyPath === "adresse");
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      )
    }
    else {
      this.sitesService.ajouter(this.nom.value, this.adresse.value).subscribe(
        success => {
          console.log(success);
          this.modal.close("added");
        },
        error => {
          console.log(error);
          this.errors = error.error;
          this.nomErrors = this.errors.filter(e => e.propertyPath === "nom");
          this.adresseErrors = this.errors.filter(e => e.propertyPath === "adresse");
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
