import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDisplayComponent } from './reclamation-display.component';

describe('ReclamationDisplayComponent', () => {
  let component: ReclamationDisplayComponent;
  let fixture: ComponentFixture<ReclamationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
