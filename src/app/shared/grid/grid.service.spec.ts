import { inject, TestBed } from '@angular/core/testing';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { GridService } from './grid.service';

describe('GridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridService, CROSS_CUTTING_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([GridService], (service: GridService) => {
    expect(service).toBeTruthy();
  }));
});
