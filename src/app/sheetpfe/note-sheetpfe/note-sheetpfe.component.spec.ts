import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSheetpfeComponent } from './note-sheetpfe.component';

describe('NoteSheetpfeComponent', () => {
  let component: NoteSheetpfeComponent;
  let fixture: ComponentFixture<NoteSheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
