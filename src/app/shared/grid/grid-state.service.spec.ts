import { inject, TestBed } from '@angular/core/testing';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { GridStateService } from './grid-state.service';

describe('GridStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridStateService, CROSS_CUTTING_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([GridStateService], (service: GridStateService) => {
    expect(service).toBeTruthy();
  }));
});
