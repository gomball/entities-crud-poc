import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18nService } from '../../services/i18n.service';
import { BaseSimpleModalComponent } from '../_bases/base-simple-modal.component';

export interface PromptModalReturnValue<T> {
  accepted: boolean;
  value?: T;
}

@Component({
  selector: 'ecp-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.scss']
})
export class PromptModalComponent<T> extends BaseSimpleModalComponent {
  private _value: string;
  @Input()
  set value(value: string) {
    this._value = value;
  }
  get value(): string {
    return this._value;
  }

  constructor(activeModal: NgbActiveModal, elementRef: ElementRef, renderer: Renderer2, i18nService: I18nService) {
    super(activeModal, elementRef, renderer, i18nService);
  }

  close(accepted: boolean, value?: T): void {
    super.close({ accepted, value });
  }
}
