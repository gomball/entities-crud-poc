import { inject, TestBed } from '@angular/core/testing';
import { ENVIRONMENT_STUB_SERVICE_PROVIDER, HTTP_DATA_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { ODataService } from './odata.service';

describe('ODataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ODataService, HTTP_DATA_STUB_SERVICE_PROVIDER, ENVIRONMENT_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([ODataService], (service: ODataService) => {
    expect(service).toBeTruthy();
  }));
});
