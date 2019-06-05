import { inject, TestBed } from '@angular/core/testing';
import { ENVIRONMENT_STUB_SERVICE_PROVIDER, EXCEPTION_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { ErrorHttpInterceptorService } from './error-http-interceptor.service';

describe('ErrorHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHttpInterceptorService, EXCEPTION_STUB_SERVICE_PROVIDER, ENVIRONMENT_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([ErrorHttpInterceptorService], (service: ErrorHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
