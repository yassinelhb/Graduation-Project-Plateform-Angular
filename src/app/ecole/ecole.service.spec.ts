import { TestBed } from '@angular/core/testing';

import { EcoleService } from './ecole.service';

describe('EcoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcoleService = TestBed.get(EcoleService);
    expect(service).toBeTruthy();
  });
});
