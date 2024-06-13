import { TestBed } from '@angular/core/testing';

import { RightSideService } from './right-side.service';

describe('RightSideService', () => {
  let service: RightSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
