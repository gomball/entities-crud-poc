import { inject, TestBed } from '@angular/core/testing';
import { HTTP_DATA_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { StoreStubModule } from '../../../_test-stubs/ngrx-store.module';
import { DomainDescriptionService } from './domain-description.service';

describe('DomainDescriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreStubModule],
      providers: [DomainDescriptionService, HTTP_DATA_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([DomainDescriptionService], (service: DomainDescriptionService) => {
    expect(service).toBeTruthy();
  }));
});
