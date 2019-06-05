import { inject, TestBed } from '@angular/core/testing';
import { ApiEndpointService } from './api-endpoint.service';

describe('ApiEndpointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiEndpointService]
    });
  });

  it('should be created', inject([ApiEndpointService], (service: ApiEndpointService) => {
    expect(service).toBeTruthy();
  }));
});
