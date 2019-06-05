import { inject, TestBed } from '@angular/core/testing';
import { NgbStubModule } from '../../_test-stubs/ng-bootstrap.module';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbStubModule],
      providers: [ModalService]
    });
  });

  it('should be created', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy();
  }));
});
