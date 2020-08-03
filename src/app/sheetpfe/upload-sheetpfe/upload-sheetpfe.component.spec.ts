import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSheetpfeComponent } from './upload-sheetpfe.component';

describe('UploadSheetpfeComponent', () => {
  let component: UploadSheetpfeComponent;
  let fixture: ComponentFixture<UploadSheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
