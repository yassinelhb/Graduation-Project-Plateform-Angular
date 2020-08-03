import { TestBed } from '@angular/core/testing';

import { SoutenanceServiceService } from './soutenance-service.service';

describe('SoutenanceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoutenanceServiceService = TestBed.get(SoutenanceServiceService);
    expect(service).toBeTruthy();
  });
});
