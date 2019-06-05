import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { API_ENDPOINT_STUB_SERVICE_PROVIDER, ODATA_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { HttpDataService } from './http-data.service';

describe('HttpDataService', () => {
  let serverStub: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpDataService, API_ENDPOINT_STUB_SERVICE_PROVIDER, ODATA_STUB_SERVICE_PROVIDER]
    });
    serverStub = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    serverStub.verify();
  });

  it('should be created', inject([HttpDataService], (service: HttpDataService) => {
    expect(service).toBeTruthy();
  }));
});
