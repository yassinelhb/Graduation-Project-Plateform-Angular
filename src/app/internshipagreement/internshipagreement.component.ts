import {Component, Inject, OnInit} from '@angular/core';
import {Internship} from '../Models/internship';
import {User} from '../Models/user';
import {SheetService} from '../sheetpfe/sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {SheetPFE} from '../Models/sheet-pfe';
import {InternshipService} from './internship.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-internshipagreement',
  templateUrl: './internshipagreement.component.html',
  styleUrls: ['./internshipagreement.component.scss']
})
export class InternshipagreementComponent implements OnInit {
  user: User;
  internships: Internship[] = [];
  notFound: any;
  email: any;
  p = 1;
  size: number;
  constructor(private internshipService: InternshipService, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.user = this.storage.get('user');

    if (this.user.role === 'DirecteurDesStages') {
     this.getInternships();
    } else if (this.user.role !== 'Etudiant') {
      this.notFound = 'assets/images/404/404.png';
    }
  }

  changeEmail() {
    this.getInternships();
  }
  getInternships() {
    let email = 'ALL';
    if (this.email) {
      email = this.email;
    }
    this.internships = []
    this.spinner.show();
    this.internshipService.internships(email).subscribe(data => {
      this.spinner.hide();
      this.size = data.length;
      if (data) {
        this.internships = data.reverse();
      }
    });
  }
}
