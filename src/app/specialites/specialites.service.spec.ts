import { TestBed } from '@angular/core/testing';

import { SpecialitesService } from './specialites.service';

describe('SpecialitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialitesService = TestBed.get(SpecialitesService);
    expect(service).toBeTruthy();
  });
});
