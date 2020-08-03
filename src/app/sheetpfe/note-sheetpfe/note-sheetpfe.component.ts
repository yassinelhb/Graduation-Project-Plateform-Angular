import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-note-sheetpfe',
  templateUrl: './note-sheetpfe.component.html',
  styleUrls: ['./note-sheetpfe.component.scss']
})
export class NoteSheetpfeComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() public type;
  @Input() public sheet;
  note: any
  error: any;
  disabled: Boolean;
  constructor(public modal: NgbActiveModal, private sheetService: SheetService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  add() {
    this.disabled = true;
    if (!this.note) {
      this.error = 'The note required';
    } else if ( this.note < 0 || this.note > 20 ) {
      this.error = 'Note must be between 0 and 20';
    } else {
      let type: String = '';
      if (this.type === 'encadreur') {
        type = 'addencadreurnote';
      } else if (this.type === 'rapporteur') {
        type = 'addrapporteurnote';
      }
      this.spinner.show();
      this.sheetService.noteSheet(type, this.note, this.sheet.id).subscribe(success => {
        this.spinner.hide();
        this.passEntry.emit(this.note);
        this.modal.close();
      });
    }
  }
  changeNote() {
    this.disabled = false;
    this.error = '';
  }

}
