import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { regGuard } from './reg.guard';

describe('regGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => regGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
