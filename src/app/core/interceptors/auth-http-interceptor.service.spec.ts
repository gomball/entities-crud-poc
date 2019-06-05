import { inject, TestBed } from '@angular/core/testing';
import { ENVIRONMENT_STUB_SERVICE_PROVIDER, STORAGE_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { AuthHttpInterceptorService } from './auth-http-interceptor.service';

describe('AuthHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttpInterceptorService, ENVIRONMENT_STUB_SERVICE_PROVIDER, STORAGE_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([AuthHttpInterceptorService], (service: AuthHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
