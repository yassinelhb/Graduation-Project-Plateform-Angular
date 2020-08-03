import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySheetpfeComponent } from './modify-sheetpfe.component';

describe('ModifySheetpfeComponent', () => {
  let component: ModifySheetpfeComponent;
  let fixture: ComponentFixture<ModifySheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
