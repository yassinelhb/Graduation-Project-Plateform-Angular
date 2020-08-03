import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitesComponent } from './specialites.component';

describe('SpecialitesComponent', () => {
  let component: SpecialitesComponent;
  let fixture: ComponentFixture<SpecialitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
