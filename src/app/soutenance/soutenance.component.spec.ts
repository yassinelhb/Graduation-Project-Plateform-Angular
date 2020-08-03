import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenanceComponent } from './soutenance.component';

describe('SoutenanceComponent', () => {
  let component: SoutenanceComponent;
  let fixture: ComponentFixture<SoutenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoutenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
