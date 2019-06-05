import { ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18nService } from '../../services/i18n.service';
import { BaseModalComponent } from './base-modal.component';

export abstract class BaseSimpleModalComponent extends BaseModalComponent {
  @Input()
  readonly titleKey: string;
  @Input()
  readonly messageKey: string;
  @Input()
  readonly translateParams: any;

  get title(): string {
    return !!this.translateParams ? this._i18nService.translate(this.titleKey, this.translateParams) : this.titleKey;
  }

  get message(): string {
    return !!this.translateParams ? this._i18nService.translate(this.messageKey, this.translateParams) : this.messageKey;
  }

  constructor(activeModal: NgbActiveModal, elementRef: ElementRef, renderer: Renderer2, private _i18nService: I18nService) {
    super(activeModal, elementRef, renderer);
  }
}
