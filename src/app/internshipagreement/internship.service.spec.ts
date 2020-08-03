import { TestBed } from '@angular/core/testing';

import { InternshipService } from './internship.service';

describe('InternshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternshipService = TestBed.get(InternshipService);
    expect(service).toBeTruthy();
  });
});
