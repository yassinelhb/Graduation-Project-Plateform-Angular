import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetpfeComponent } from './sheetpfe.component';

describe('SheetpfeComponent', () => {
  let component: SheetpfeComponent;
  let fixture: ComponentFixture<SheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
