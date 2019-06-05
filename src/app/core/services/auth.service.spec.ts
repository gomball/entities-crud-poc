import { inject, TestBed } from '@angular/core/testing';
import {
  HTTP_DATA_STUB_SERVICE_PROVIDER,
  NAVIGATION_STUB_SERVICE_PROVIDER,
  STORAGE_STUB_SERVICE_PROVIDER
} from '../../_test-stubs/core-injectables.providers';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthService, HTTP_DATA_STUB_SERVICE_PROVIDER, STORAGE_STUB_SERVICE_PROVIDER, NAVIGATION_STUB_SERVICE_PROVIDER]
    }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
