import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRSComponent } from './notification-rs.component';

describe('NotificationRSComponent', () => {
  let component: NotificationRSComponent;
  let fixture: ComponentFixture<NotificationRSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationRSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
