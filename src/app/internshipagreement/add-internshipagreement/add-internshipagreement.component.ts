import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Internship} from '../../Models/internship';
import {noWhitespaceValidator, removeSpaces} from '../../sheetpfe/validator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SheetService} from '../../sheetpfe/sheet.service';
import {Entreprise} from '../../Models/entreprise';
import {DatePipe} from '@angular/common';
import {User} from '../../Models/user';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {InternshipService} from '../internship.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-internshipagreement',
  templateUrl: './add-internshipagreement.component.html',
  styleUrls: ['./add-internshipagreement.component.scss']
})
export class AddInternshipagreementComponent implements OnInit {
  @Input() internship: Internship;
  @Input() edit;
  @Output() hide = new EventEmitter<any>();
  user: User;
  entreprises: Entreprise[];
  internshipForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private sheetService: SheetService, private datePipe: DatePipe,
              private internshipService: InternshipService, private spinner: NgxSpinnerService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.user = this.storage.get('user')
    this.sheetService.entreprises().subscribe(data => {
      if (data) {
        this.entreprises = data;
      }
    });
    if (this.edit === false) {
      this.sheetService.studentSheet(this.user.id).subscribe(data => {
        if (data) {
          this.entreprise.get('id').setValue(data.entreprise.id);
        }
      });
    }

    this.internshipForm =  this.formBuilder.group({
      id: [],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      entreprise: this.formBuilder.group({
        id: ['', [ Validators.required ]],
      }),
    });

    if (this.internship) {
      this.internshipForm.patchValue(this.internship);
    }
  }

  get startDate() {
    return this.internshipForm.get('startDate');
  }
  get endDate() {
    return this.internshipForm.get('endDate');
  }
  get entreprise() {
    return this.internshipForm.get('entreprise');
  }

  addInternship() {
    if (new Date().getTime() > new Date( this.startDate.value ).getTime() ||  new Date( this.startDate.value ).getTime() >  new Date( this.endDate.value ).getTime()) {
      this.startDate.setErrors({'invalid': true});
      this.endDate.setErrors({'invalid': true});
    } else if ( this.internshipForm.valid ) {
      this.spinner.show();
      this.internshipForm.setErrors({'submit': true});
      this.internshipService.addInternship(this.internshipForm.value).subscribe(success => {
        this.internship = this.internshipForm.value;
        this.internship.entreprise = this.entreprises.filter(e => e.id.toString() === this.entreprise.get('id').value.toString())[0];
        this.spinner.hide();
        this.hide.emit(this.internship);
      });
    }
  }
  editInternship() {
    if (new Date().getTime() > new Date( this.startDate.value ).getTime() ||  new Date( this.startDate.value ).getTime() >  new Date( this.endDate.value ).getTime()) {
      this.startDate.setErrors({'invalid': true});
      this.endDate.setErrors({'invalid': true});
    } else if ( this.internshipForm.valid ) {
      this.spinner.show();
      this.internshipForm.setErrors({'submit': true});
      this.internshipService.updateInternship(this.internshipForm.value).subscribe(success => {
        this.internship = this.internshipForm.value;
        this.internship.entreprise = this.entreprises.filter(e => e.id.toString() === this.entreprise.get('id').value.toString())[0];
        this.spinner.hide();
        this.hide.emit(this.internship);
      });
    }
  }
  cancel() {
    this.hide.emit();
  }

}
