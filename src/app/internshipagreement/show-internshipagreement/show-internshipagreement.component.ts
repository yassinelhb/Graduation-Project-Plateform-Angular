import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {Internship} from '../../Models/internship';
import {InternshipService} from '../internship.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-show-internshipagreement',
  templateUrl: './show-internshipagreement.component.html',
  styleUrls: ['./show-internshipagreement.component.scss']
})
export class ShowInternshipagreementComponent implements OnInit {
  add: Boolean = false;
  edit: Boolean = false;
  user: User;
  internship: Internship;
  internship_id: any;
  notFound: any;
  constructor(private modal: NgbModal, private internshipService: InternshipService, private route: ActivatedRoute,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.internship_id = params['id']; });
    this.user = this.storage.get('user');
    if (this.user.role === 'Etudiant') {
      if (this.internship_id) {
        this.notFound = 'assets/images/404/404.png';
      } else {
        this.spinner.show();
        this.internshipService.studentInternship(this.user.id).subscribe(data => {
          this.spinner.hide();
            if (data) {
              this.internship = data;
            } else {
              this.add = true;
            }
        });
      }
    } else if (this.user.role === 'DirecteurDesStages') {
        this.spinner.show();
        this.internshipService.internship(this.internship_id).subscribe(data => {
          this.spinner.hide();
          if (data) {
            this.internship = data;
          } else {
            this.notFound = 'assets/images/404/404.png';
          }
        }, error => {
          this.notFound = 'assets/images/404/404.png';
        });
    } else {
      this.notFound = 'assets/images/404/404.png';
    }
  }

  update() {
    this.edit = true;
  }
  hide(internship) {
    this.internship = internship;
    this.edit = false;
  }

  export() {
    this.spinner.show();
    this.internshipService.export(this.internship.id).subscribe(
        (data: Blob) => {
          this.spinner.hide();
          const file = new Blob([data], {type: 'application/pdf'})
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          const a         = document.createElement('a');
          a.href        = fileURL;
          a.target      = '_blank';
          a.download    = 'Convention.pdf';
          document.body.appendChild(a);
          a.click();
        },
      (error) => {
        this.spinner.hide();
        console.log('getPDF error: ',error);
        }
      );
  }

}
