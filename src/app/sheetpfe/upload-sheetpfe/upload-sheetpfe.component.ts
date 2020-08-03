import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SheetService} from '../sheet.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-upload-sheetpfe',
  templateUrl: './upload-sheetpfe.component.html',
  styleUrls: ['./upload-sheetpfe.component.scss']
})
export class UploadSheetpfeComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  disabled: Boolean = true;
  fileToUpload: File = null;
  files: any[] = [];
  constructor(public modal: NgbActiveModal, private sheetService: SheetService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.disabled = false;
      this.fileToUpload = files.item(0);
    } else {
      this.disabled = true;
    }
  }

  uploadFileToActivity() {
    this.disabled = true;
    this.spinner.show();
    this.sheetService.postFile(this.fileToUpload).subscribe(success => {
      this.spinner.hide();
      if (success) {
        this.modal.close();
        this.passEntry.emit();
      }
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }
}
