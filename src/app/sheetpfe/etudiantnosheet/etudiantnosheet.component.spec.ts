import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantnosheetComponent } from './etudiantnosheet.component';

describe('EtudiantnosheetComponent', () => {
  let component: EtudiantnosheetComponent;
  let fixture: ComponentFixture<EtudiantnosheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantnosheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantnosheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
