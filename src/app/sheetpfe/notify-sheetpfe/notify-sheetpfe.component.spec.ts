import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySheetpfeComponent } from './notify-sheetpfe.component';

describe('NotifySheetpfeComponent', () => {
  let component: NotifySheetpfeComponent;
  let fixture: ComponentFixture<NotifySheetpfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifySheetpfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySheetpfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
