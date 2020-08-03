import { TestBed } from '@angular/core/testing';

import { EnseignantsService } from './enseignants.service';

describe('EnseignantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnseignantsService = TestBed.get(EnseignantsService);
    expect(service).toBeTruthy();
  });
});
