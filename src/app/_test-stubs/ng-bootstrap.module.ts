import { Provider, NgModule, Directive, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class NgbModalStub {}
export const NGB_MODAL_STUB_PROVIDER: Provider = {
  provide: NgbModal,
  useClass: NgbModalStub
};

export class NgbActiveModalStub {}
export const NGB_ACTIVE_MODAL_STUB_PROVIDER: Provider = {
  provide: NgbActiveModal,
  useClass: NgbActiveModalStub
};

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[ngbTooltip]'
  /* tslint:enable */
})
export class NgbTooltipStubDirective {
  @Input()
  ngbTooltip: any;
}

@NgModule({
  declarations: [NgbTooltipStubDirective],
  exports: [NgbTooltipStubDirective],
  providers: [NGB_MODAL_STUB_PROVIDER, NGB_ACTIVE_MODAL_STUB_PROVIDER]
})
export class NgbStubModule {}
