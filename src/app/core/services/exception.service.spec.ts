import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MODAL_STUB_SERVICE_PROVIDER, NOTIFICATION_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { ExceptionService } from './exception.service';


describe('ExceptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([])],
    providers: [ExceptionService, MODAL_STUB_SERVICE_PROVIDER, NOTIFICATION_STUB_SERVICE_PROVIDER]
  }));

  it('should be created', inject([ExceptionService], (service: ExceptionService) => {
    expect(service).toBeTruthy();
  }));
});
