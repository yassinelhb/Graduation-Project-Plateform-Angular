import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ValidSheetpfeComponent} from '../valid-sheetpfe/valid-sheetpfe.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {SheetPFE} from '../../Models/sheet-pfe';

@Component({
  selector: 'app-detail-sheetpfe',
  templateUrl: './detail-sheetpfe.component.html',
  styleUrls: ['./detail-sheetpfe.component.scss']
})
export class DetailSheetpfeComponent implements OnInit {

  @Input() sheet;

  constructor(private modal: NgbModal, private sheetService: SheetService) { }

  ngOnInit() {

  }


}
