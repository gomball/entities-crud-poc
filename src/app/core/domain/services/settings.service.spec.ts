import { inject, TestBed } from '@angular/core/testing';
import { HTTP_DATA_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService, HTTP_DATA_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));
});
