import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInternshipagreementComponent } from './show-internshipagreement.component';

describe('ShowInternshipagreementComponent', () => {
  let component: ShowInternshipagreementComponent;
  let fixture: ComponentFixture<ShowInternshipagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInternshipagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInternshipagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
