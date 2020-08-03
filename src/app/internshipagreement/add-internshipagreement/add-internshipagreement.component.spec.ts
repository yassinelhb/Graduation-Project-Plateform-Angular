import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternshipagreementComponent } from './add-internshipagreement.component';

describe('AddInternshipagreementComponent', () => {
  let component: AddInternshipagreementComponent;
  let fixture: ComponentFixture<AddInternshipagreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInternshipagreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInternshipagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
