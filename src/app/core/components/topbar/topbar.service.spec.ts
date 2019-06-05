import { inject, TestBed } from '@angular/core/testing';
import {
  CROSS_CUTTING_STUB_SERVICE_PROVIDER,
  DOMAIN_DESCRIPTION_STUB_SERVICE_PROVIDER,
  SESSION_STUB_SERVICE_PROVIDER
} from '../../../_test-stubs/core-injectables.providers';
import { TopbarService } from './topbar.service';

describe('TopbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TopbarService,
        CROSS_CUTTING_STUB_SERVICE_PROVIDER,
        DOMAIN_DESCRIPTION_STUB_SERVICE_PROVIDER,
        SESSION_STUB_SERVICE_PROVIDER
      ]
    });
  });

  it('should be created', inject([TopbarService], (service: TopbarService) => {
    expect(service).toBeTruthy();
  }));
});
