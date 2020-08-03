import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSheetpfeComponent } from './show-sheetpfe.component';

describe('ShowSheetpfeComponent', () => {
  let component: ShowSheetpfeComponent;
  let fixture: ComponentFixture<ShowSheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
