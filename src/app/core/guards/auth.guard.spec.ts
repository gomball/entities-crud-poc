import { inject, TestBed } from '@angular/core/testing';
import { AUTH_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, AUTH_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
