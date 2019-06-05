import { inject, TestBed } from '@angular/core/testing';
import { HTTP_DATA_STUB_SERVICE_PROVIDER, STORAGE_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { NgxTranslateStubModule } from '../../../_test-stubs/ngx-translate.module';
import { SessionService } from './session.service';

describe('SessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxTranslateStubModule],
      providers: [SessionService, HTTP_DATA_STUB_SERVICE_PROVIDER, STORAGE_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
