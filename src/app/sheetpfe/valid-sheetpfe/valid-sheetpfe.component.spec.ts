import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidSheetpfeComponent } from './valid-sheetpfe.component';

describe('ValidSheetpfeComponent', () => {
  let component: ValidSheetpfeComponent;
  let fixture: ComponentFixture<ValidSheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidSheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidSheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
