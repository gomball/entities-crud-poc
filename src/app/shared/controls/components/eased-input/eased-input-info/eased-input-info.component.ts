import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '../../../../../core/components/_bases/base-modal.component';

@Component({
  selector: 'ecp-eased-input-info',
  templateUrl: './eased-input-info.component.html',
  styleUrls: ['./eased-input-info.component.scss']
})
export class EasedInputInfoModalComponent extends BaseModalComponent {
  @Input()
  element: any;
  @Input()
  properties: [string, string] = ['code', 'name'];

  constructor(activeModal: NgbActiveModal, elementRef: ElementRef, renderer: Renderer2) {
    super(activeModal, elementRef, renderer);
  }
}
