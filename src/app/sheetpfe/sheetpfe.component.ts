import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../Models/user';
import {SheetPFE} from '../Models/sheet-pfe';
import {SheetService} from './sheet.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Categorie} from '../Models/categorie';
import {Entreprise} from '../Models/entreprise';
import {AffectSheetpfeEnseignantComponent} from './affect-sheetpfe-enseignant/affect-sheetpfe-enseignant.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadSheetpfeComponent} from './upload-sheetpfe/upload-sheetpfe.component';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-sheetpfe',
  templateUrl: './sheetpfe.component.html',
  styleUrls: ['./sheetpfe.component.scss']
})
export class SheetpfeComponent implements OnInit {
  user: User;
  sheets: SheetPFE[] = [];
  notFound: any;
  param: any;
  etat: any = 'ALL';
  type: any = 'ALL';
  year: any;
  toyear: any;
  pays: any = 'ALL';
  categorie: Number = 0;
  categories: Categorie[];
  entreprises: Entreprise[];
  alert: Boolean = false;
  p = 1;
  size: number;

  constructor(private route: ActivatedRoute, private sheetService: SheetService, private modal: NgbModal,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService, private datePipe: DatePipe, private spinner: NgxSpinnerService) { }
  ngOnInit() {

    this.user = this.storage.get('user');
    if (this.user.role === 'Etudiant') {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        if (this.param) {
          this.notFound = 'assets/images/404/404.png';
        } else {
          this.notFound = '';
        }
      });
    }
    if (this.user.role === 'ChefDeDepartement') {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        this.notFound = '';
        if (this.param) {
          if (this.param === '_rapporteur') {
            this.param = 'waitRapporter';
          } else if (this.param === '_encadreur') {
            this.param = 'waitEncadreur';
          } else if (this.param === '_note') {
            this.param = 'waitNote';
          } else if (this.param === '_accepted') {
            this.param = 'accepted';
          } else {
            this.notFound = 'assets/images/404/404.png';
          }
          this.sheets = [];
          if (!this.notFound) {
            this.spinner.show();
            this.sheetService.sheet(this.param).subscribe(data => {
              this.sheets = [];
              this.spinner.hide();
              if (data) {
                this.size = data.length;
                this.sheets = data;
              }
            }, error =>  {
              this.spinner.hide();
              if (error.status === 404) {
                this.notFound = 'assets/images/404/404.png';
              }
            } );
          }
        } else {
          this.notFound = 'assets/images/404/404.png';
        }
      });

    }
    if (this.user.role === 'DirecteurDesStages') {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        this.notFound = '';
        if (this.param) {
          if (this.param === '_planning') {
            this.sheets = [];
            this.spinner.show();
            this.sheetService.sheet('waitPlaning').subscribe(data => {
              this.size = data.length;
              this.spinner.hide();
              if (data) {
                data.forEach(s => {
                  let exist_e = false;
                  let exist_r = false;
                  s.enseignantsheet.forEach(es => {
                    if (es.type === 'ENCADREUR') {
                      exist_e = true;
                    }
                    if (es.type === 'RAPPORTEUR') {
                      exist_r = true;
                    }
                  });
                  if ( exist_e && exist_r) {
                    this.sheets.push(s);
                  }
                });
              }
            }, error =>  {
              this.spinner.hide();
              if (error.status === 404) {
                this.notFound = 'assets/images/404/404.png';
              }
            } );
          } else {
            this.notFound = 'assets/images/404/404.png';
          }
        } else {
          this.year = this.datePipe.transform(new Date(),'yyyy-MM');
          this.getSheetPFEs();
          this.sheetService.categories().subscribe(data => {
            if (data) {
              this.categories = data;
            }
          });
          this.sheetService.entreprises().subscribe(data => {
            if (data) {
              this.entreprises = Array.from(data.reduce((m, e) => m.set(e.pays, e), new Map()).values());
            }
          });
        }
      });
    }
    if ( this.user.role === 'Enseignant' ) {
      this.route.queryParams.subscribe((params) => {
        this.param = params.q;
        if ( this.param ) {
          if ( this.param === '_modify') {
            this.notFound = '';
            this.sheets = []
            this.spinner.show();
            this.sheetService.sheets(this.etat, 0, this.pays, this.categorie).subscribe(data => {
              this.size = data.length;
              this.spinner.hide();
              if (data) {
                data.forEach(s => {
                  s.sheetPFEModifications.forEach(m => {
                    if (m.etat === 'DEFAULT') {
                        this.sheets.push(s);
                    }
                  });
                });
                this.sheets =   Array.from(this.sheets.reduce((m , s) => m.set(s.id, s), new Map()).values());
                this.sheets.reverse();
              }
            });
          } else if (this.param === '_note') {
              this.param = 'waitNote';
                this.spinner.show();
                this.sheetService.sheet(this.param).subscribe(data => {
                  this.size = data.length;
                  this.sheets = [];
                  this.spinner.hide();
                  if (data) {
                    data.forEach(s => {
                      let check = false;
                      s.enseignantsheet.forEach(es => {
                        if (es.enseignant.id === this.user.id && (es.type === 'ENCADREUR' || es.type === 'RAPPORTEUR')
                          && check === false ) {
                          this.sheets.push(s);
                          check = true;
                        }
                      });
                    });
                  }
                });

          } else {
              this.notFound = 'assets/images/404/404.png';
          }
        } else {
          this.year = this.datePipe.transform(new Date(),'yyyy-MM');
          this.toyear =  this.datePipe.transform(new Date(),'yyyy-MM');
          this.getSheetPFEs();
        }
      });
    }

  }
  getSheetPFEs() {
    if (! this.year) {
      this.year =  this.datePipe.transform(new Date(),'yyyy-MM');
    }
    if (! this.toyear) {
      this.toyear =  this.datePipe.transform(new Date(),'yyyy-MM');
    }
    if (this.user.role === 'DirecteurDesStages') {
      this.spinner.show();
      this.sheetService.sheets(this.etat, this.year.substring(0, 4), this.pays, this.categorie).subscribe(data => {
        this.spinner.hide();
        this.sheets = []
        if (data) {
          this.size = data.length;
          if (this.etat === 'DEFAULT' && this.year.substring(0, 4) === this.datePipe.transform(new Date(), 'yyyy-MM').substring(0, 4)) {
            data.reverse();
          }
          this.sheets = data;
        }
      }, error =>  {
        this.spinner.hide();
        if (error.status === 404) {
          this.notFound = 'assets/images/404/404.png';
        }
      } );
    }

    if (this.user.role === 'Enseignant') {
      this.sheets = []
      this.spinner.show();
      this.sheetService.enseignantSheets(this.year.substring(0, 4) , this.toyear.substring(0, 4) , this.type).subscribe(data => {
        this.spinner.hide();
        if (this.type === 'ALL') {
            if (data) {
              this.sheets =   Array.from(data.reduce((m , s) => m.set(s.id, s), new Map()).values());
            }
        } else {
          this.sheets = data;
        }
      }, error =>  {
        this.spinner.hide();
        if (error.status === 404) {
          this.notFound = 'assets/images/404/404.png';
        }
      } );
    }
  }

  reset() {
    this.type = 'ALL'
    this.etat = 'ALL';
    this.pays = 'ALL';
    this.year = this.datePipe.transform(new Date(),'yyyy-MM');
    this.toyear = this.datePipe.transform(new Date(),'yyyy-MM');
    this.categorie = 0;
  }

  enseignantType(sheet: SheetPFE) {
    const enseignantSheets: string[] = [];
    sheet.enseignantsheet.forEach(es => {
      if ( es.enseignant.id === this.user.id) {
            enseignantSheets.push(es.type);
      }
    });
    return enseignantSheets;
  }

  upload() {
    const modalRef = this.modal.open(UploadSheetpfeComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
        this.alert = true;
        this.getSheetPFEs();
    });
  }
}
