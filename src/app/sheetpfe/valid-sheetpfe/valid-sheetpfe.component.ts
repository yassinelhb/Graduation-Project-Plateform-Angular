import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {not} from 'rxjs/internal-compatibility';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-valid-sheetpfe',
  templateUrl: './valid-sheetpfe.component.html',
  styleUrls: ['./valid-sheetpfe.component.scss']
})
export class ValidSheetpfeComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public type;
  @Input() public sheet;
  sheetM_id: any;
  note: any;
  error: any;
  disabled: Boolean = false;
  constructor(public modal: NgbActiveModal, private sheetService: SheetService,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  valid() {
    if (!this.note && this.type === 'request') {
      this.error = 'The note required ';
    } else {
      this.disabled = true;
      if (this.storage.get('user').role === 'DirecteurDesStages') {
        this.spinner.show();
        this.sheetService.validsheetByDirecteur(this.sheet.id, this.type.toUpperCase()).subscribe(success => {
          this.spinner.hide();
          let type = 'REFUSE';
          if (this.type === 'accepted') {
            type = 'ACCEPTED';
          }
          const obj = {
            'etat': type
          }
          this.passEntry.emit(obj);
          this.modal.close();
        });
      }
      if (this.storage.get('user').role === 'Enseignant') {
        let note: String = 'ACCEPTED';
        let type: String = 'REQUEST';
        if (this.note) {
          note = this.note;
        }
        if ( this.sheet.etat === 'VALIDATE') {
          if (this.type === 'accepted') {
            type = 'ACCEPTED';
          }
          this.sheet.sheetPFEModifications.forEach(m => {
            if (m.etat === 'DEFAULT') {
              this.sheetM_id = m.id;
            }
          });
          this.spinner.show();
          this.sheetService.acceptesheetModify(this.sheetM_id, type, note).subscribe(success => {
            this.spinner.hide();

            const obj = {
              'etat': type,
              'note': note
            }
            this.passEntry.emit(obj);
            this.modal.close();
          });
        } else {
          if (this.type === 'accepted') {
            type = 'VALIDATE';
          }
          this.spinner.show();
          this.sheetService.validsheetByEnseignant(this.sheet.id, type, note).subscribe(success => {
            this.spinner.hide();
            const obj = {
              'etat': type,
              'note': note
            }
            this.passEntry.emit(obj);
            this.modal.close();
          });
        }
      }
    }
  }

  changeText() {
    this.error = '';
  }

}
