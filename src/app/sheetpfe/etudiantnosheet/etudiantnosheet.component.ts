import {Component, Inject, OnInit} from '@angular/core';
import {Etudiant} from '../../Models/etudiant';
import {DatePipe} from '@angular/common';
import {SheetService} from '../sheet.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-etudiantnosheet',
  templateUrl: './etudiantnosheet.component.html',
  styleUrls: ['./etudiantnosheet.component.scss']
})
export class EtudiantnosheetComponent implements OnInit {
  user: User;
  notFound: any;
  alert: Boolean = false;
  disabled: Boolean = false;
  startyear: any;
  toyear: any ;
  errorDate: Boolean = false;
  etudiants: Etudiant[] = [];
  p = 1;
  size: number;

  constructor(private route: ActivatedRoute, private sheetService: SheetService, private datePipe: DatePipe,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.user = this.storage.get('user');

    if (this.user.role === 'DirecteurDesStages') {
      this.startyear = this.datePipe.transform(new Date(),'yyyy-MM');
      this.toyear = this.datePipe.transform(new Date(),'yyyy-MM');
      this.getEtudiantNoSheet();
    } else {
      this.notFound = 'assets/images/404/404.png';
    }


  }

  sendMail() {
    this.alert = false;
    this.disabled = true;
    if ( this.errorDate === false) {
      this.spinner.show();
      this.sheetService.sendMail(this.etudiants).subscribe(success => {
        this.spinner.hide();
        if (success) {
          this.alert = true;
          this.disabled = false;
        }
      });
    }
  }

  updateForm() {
    this.errorDate = false;
    this.getEtudiantNoSheet();
  }

  getEtudiantNoSheet() {
    if (this.startyear.substring(0, 4) > this.toyear.substring(0, 4)) {
      this.errorDate = true;
    }
    if (! this.startyear) {
      this.startyear =  this.datePipe.transform(new Date(),'yyyy-MM');
      this.errorDate = false;
    }
    if (! this.toyear) {
      this.toyear =  this.datePipe.transform(new Date(),'yyyy-MM');
      this.errorDate = false;
    }
    this.etudiants = [];
    this.spinner.show();
    this.sheetService.studentnoSheet(this.startyear.substring(0, 4), this.toyear.substring(0, 4)).subscribe(data => {
      this.spinner.hide();
      if (data) {
          this.size = data.length;
          this.etudiants = data;
        }
    });
  }



}
