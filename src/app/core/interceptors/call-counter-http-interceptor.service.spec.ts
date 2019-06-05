import { inject, TestBed } from '@angular/core/testing';
import { ENVIRONMENT_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { StoreStubModule } from '../../_test-stubs/ngrx-store.module';
import { CallCounterHttpInterceptorService } from './call-counter-http-interceptor.service';

describe('CallCounterHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreStubModule],
      providers: [CallCounterHttpInterceptorService, ENVIRONMENT_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([CallCounterHttpInterceptorService], (service: CallCounterHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
