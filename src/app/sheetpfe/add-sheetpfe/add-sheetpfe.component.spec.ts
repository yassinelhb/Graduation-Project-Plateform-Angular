import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSheetpfeComponent } from './add-sheetpfe.component';

describe('AddSheetpfeComponent', () => {
  let component: AddSheetpfeComponent;
  let fixture: ComponentFixture<AddSheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
