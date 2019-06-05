import { NgModule, Provider } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export class ToastrStubService {}

export const TOASTR_STUB_SERVICE_PROVIDER: Provider = {
  provide: ToastrService,
  useClass: ToastrStubService
};

@NgModule({
  providers: [TOASTR_STUB_SERVICE_PROVIDER]
})
export class ToastrStubModule {}
