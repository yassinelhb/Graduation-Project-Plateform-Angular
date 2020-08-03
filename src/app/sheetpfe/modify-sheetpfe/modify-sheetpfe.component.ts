import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {ValidSheetpfeComponent} from '../valid-sheetpfe/valid-sheetpfe.component';

@Component({
  selector: 'app-modify-sheetpfe',
  templateUrl: './modify-sheetpfe.component.html',
  styleUrls: ['./modify-sheetpfe.component.scss']
})
export class ModifySheetpfeComponent implements OnInit {
  @Output() hide: EventEmitter<any> = new EventEmitter();
  @Input() sheet;

  constructor(private modal: NgbModal, private sheetService: SheetService) { }

  ngOnInit() {
  }

  valid(type) {
    const modalRef = this.modal.open(ValidSheetpfeComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.sheet = this.sheet;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if ( receivedEntry.etat === 'ACCEPTED') {
        this.sheet.sheetPFEModifications.forEach(m => {
          if (m.etat === 'DEFAULT') {
            this.sheet.title = m.title;
            this.sheet.description = m.description;
            this.sheet.problematic = m.problematic;
            this.sheet.features = m.features;
            this.sheet.categories = m.categories;
          }
        });
      }
      this.hide.emit();
    });

  }


}
