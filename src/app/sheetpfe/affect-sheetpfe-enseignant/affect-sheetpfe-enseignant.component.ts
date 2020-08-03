import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {Enseignant} from '../../Models/enseignant';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-affect-sheetpfe-enseignant',
  templateUrl: './affect-sheetpfe-enseignant.component.html',
  styleUrls: ['./affect-sheetpfe-enseignant.component.scss']
})
export class AffectSheetpfeEnseignantComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public type;
  @Input() public sheet;
  @Input() public action;
  enseignants: Enseignant[];
  enseignantID: number;
  enseignant: Enseignant;
  error: any;
  disabled: Boolean;
  constructor(public modal: NgbActiveModal, private sheetService: SheetService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
      if ( this.action === 'Affect') {
        this.enseignantID = this.type;
      } else {
        this.sheet.enseignantsheet.forEach(es => {
          if ( es.type === this.type.toUpperCase()) {
            this.enseignantID = es.enseignant.id;
         }
        } );
      }
    this.sheetService.enseignantsheet(this.type , this.sheet.id).subscribe(data => {
      if (data) {
          this.enseignants = data;
        }
      });
  }
  affect() {
    if (this.enseignantID === this.type) {
      this.error = 'Choice ' + this.type;
    } else {
      this.disabled = true;
      this.spinner.show();
      this.sheetService.affectenseignantsheet(this.type , this.sheet.id, this.enseignantID).subscribe(success => {
        this.spinner.hide();

        const obj = {
            'type': this.type,
            'enseignant': this.enseignant
          }
          this.passEntry.emit(obj);
          this.modal.close();
      });
    }
  }

  update() {
    this.disabled = true;
    this.spinner.show();
    this.sheetService.updateenseignantsheet(this.type , this.sheet.id, this.enseignantID).subscribe(success => {
      this.spinner.hide();
      const obj = {
        'type': this.type,
        'enseignant': this.enseignant
      }
      this.passEntry.emit(obj);
      this.modal.close();
    });
  }

  changeEnseignant() {
    this.error = '';
    this.enseignants.forEach(e => {
      if ( e.id === this.enseignantID ) {
        this.enseignant = e;
      }
    })
  }
}
