import { inject, TestBed } from '@angular/core/testing';
import { ENVIRONMENT_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { TransformHttpInterceptorService } from './transform-http-interceptor.service';

describe('TransformHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformHttpInterceptorService, ENVIRONMENT_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([TransformHttpInterceptorService], (service: TransformHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
