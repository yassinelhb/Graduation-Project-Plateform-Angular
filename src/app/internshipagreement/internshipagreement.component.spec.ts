import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipagreementComponent } from './internshipagreement.component';

describe('InternshipagreementComponent', () => {
  let component: InternshipagreementComponent;
  let fixture: ComponentFixture<InternshipagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
