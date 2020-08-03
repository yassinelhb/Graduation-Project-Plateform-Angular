import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectSheetpfeEnseignantComponent } from './affect-sheetpfe-enseignant.component';

describe('AffectSheetpfeEnseignantComponent', () => {
  let component: AffectSheetpfeEnseignantComponent;
  let fixture: ComponentFixture<AffectSheetpfeEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectSheetpfeEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectSheetpfeEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
