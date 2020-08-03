import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenanceComponentComponent } from './soutenance-component.component';

describe('SoutenanceComponentComponent', () => {
  let component: SoutenanceComponentComponent;
  let fixture: ComponentFixture<SoutenanceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoutenanceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenanceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
