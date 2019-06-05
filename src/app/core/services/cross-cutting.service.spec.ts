import { inject, TestBed } from '@angular/core/testing';
import {
  AUTH_STUB_SERVICE_PROVIDER,
  CORE_CONFIG_STUB_PROVIDER,
  ENVIRONMENT_STUB_SERVICE_PROVIDER,
  HTTP_DATA_STUB_SERVICE_PROVIDER,
  I18N_STUB_SERVICE_PROVIDER,
  MODAL_STUB_SERVICE_PROVIDER,
  NAVIGATION_STUB_SERVICE_PROVIDER,
  NOTIFICATION_STUB_SERVICE_PROVIDER,
  STORAGE_STUB_SERVICE_PROVIDER
} from '../../_test-stubs/core-injectables.providers';
import { CrossCuttingService } from './cross-cutting.service';

describe('CrossCuttingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CrossCuttingService,
        AUTH_STUB_SERVICE_PROVIDER,
        CORE_CONFIG_STUB_PROVIDER,
        HTTP_DATA_STUB_SERVICE_PROVIDER,
        ENVIRONMENT_STUB_SERVICE_PROVIDER,
        I18N_STUB_SERVICE_PROVIDER,
        MODAL_STUB_SERVICE_PROVIDER,
        NAVIGATION_STUB_SERVICE_PROVIDER,
        NOTIFICATION_STUB_SERVICE_PROVIDER,
        STORAGE_STUB_SERVICE_PROVIDER
      ]
    });
  });

  it('should be created', inject([CrossCuttingService], (service: CrossCuttingService) => {
    expect(service).toBeTruthy();
  }));
});
