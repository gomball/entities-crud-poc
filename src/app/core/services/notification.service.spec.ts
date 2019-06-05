import { inject, TestBed } from '@angular/core/testing';
import { I18N_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { StoreStubModule } from '../../_test-stubs/ngrx-store.module';
import { ToastrStubModule } from '../../_test-stubs/ngx-toastr.module';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreStubModule, ToastrStubModule],
      providers: [NotificationService, MODAL_STUB_SERVICE_PROVIDER, I18N_STUB_SERVICE_PROVIDER]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
