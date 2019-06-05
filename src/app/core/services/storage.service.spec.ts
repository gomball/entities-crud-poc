import { inject, TestBed } from '@angular/core/testing';
import { CORE_CONFIG_STUB_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, CORE_CONFIG_STUB_PROVIDER]
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
