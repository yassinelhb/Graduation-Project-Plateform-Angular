import { Component, OnInit, Inject } from '@angular/core';
import { Ecole } from '../Models/ecole';
import { EcoleService } from './ecole.service';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { User } from '../Models/user';
import { Admin } from '../Models/admin';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Error } from '../Models/error';
import { HttpClient } from '@angular/common/http';
import { Config } from '../Models/config';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-ecole',
  templateUrl: './ecole.component.html',
  styleUrls: ['./ecole.component.scss']
})
export class EcoleComponent implements OnInit {
  ecole: Ecole = null;
  loading = false;
  user: Admin = null;
  nomErrors: Error[] = [];
  adresseErrors: Error[] = [];
  errors: Error[] = [];
  ecoleForm: FormGroup;
  imageForm: FormGroup;
  hasEcole = true;
  fileData: File = null;
  fileDataDonnees: File = null;
  constructor(private authService: AuthService, private ecoleService: EcoleService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private formBuilder: FormBuilder) {
    this.user = this.storage.get('user');
    if (this.user.ecole === null) {
      this.hasEcole = false;
      this.ecole = new Ecole();
      this.ecole.nom = "";
      this.ecole.adresse = "";
    }
    else {
      this.ecole = this.user.ecole;
    }
    this.ecoleForm = this.formBuilder.group({
      nom: [this.ecole.nom],
      adresse: [this.ecole.adresse]
    })
  }
  get EcoleForm() {
    return this.ecoleForm;
  }
  get nom() {
    return this.ecoleForm.get("nom");
  }
  get adresse() {
    return this.ecoleForm.get("adresse");
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
  onSubmit() {
    this.loading = true;
    this.ecoleService.ajouterImage(this.fileData).subscribe((success) => {
      console.log(success);
      this.authService.getImage().subscribe(success => {
        this.authService.broadcastImageChange(success);
      })
      this.loading = false;
    });
  }
  fileProgressDonnees(fileInput: any) {
    this.fileDataDonnees = <File>fileInput.target.files[0];
  }
  onSubmitDonnees() {
    this.loading = true;
    if (this.fileDataDonnees===null){
      this.confirmer();
    }
    else this.ecoleService.ajouterDonnees(this.fileDataDonnees,this.adresse.value,this.nom.value).subscribe((success) => {
      console.log(success);
      this.storage.set("user", success);
      this.loading = false;
    });
  }
  confirmer() {
    this.loading = true;
    if (this.hasEcole) {
      this.ecoleService.modifier(this.nom.value, this.adresse.value, this.ecole.id).subscribe(
        success => {
          console.log(success);
          this.storage.set("user", success);
          this.errors = [];
          this.nomErrors = [];
          this.adresseErrors = [];
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
      this.ecoleService.ajouter(this.nom.value, this.adresse.value).subscribe(
        success => {
          console.log(success);
          this.storage.set("user", success);
          this.errors = [];
          this.nomErrors = [];
          this.adresseErrors = [];
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
  }

  ngOnInit() {
  }
  download() {
    this.ecoleService.downloadFile().subscribe(response => {
			let blob:any = new Blob([response], {type: 'application/ms-excel'});
			const url= window.URL.createObjectURL(blob);
      window.open(url);
      const a         = document.createElement('a');
        a.href        = url;
        a.target      = '_blank';
        a.download    = 'export.xlsx';
        document.body.appendChild(a);
        a.click();
			//window.location.href = response.url;
			//fileSaver.saveAs(blob, 'employees.json');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
}
