import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSheetpfeComponent } from './detail-sheetpfe.component';

describe('DetailSheetpfeComponent', () => {
  let component: DetailSheetpfeComponent;
  let fixture: ComponentFixture<DetailSheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
