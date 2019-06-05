import { TestBed } from '@angular/core/testing';
import { SlideBandService } from './slide-band.service';

describe('SlideBandService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [SlideBandService]
    }));

  it('should be created', () => {
    const service: SlideBandService = TestBed.get(SlideBandService);
    expect(service).toBeTruthy();
  });
});
