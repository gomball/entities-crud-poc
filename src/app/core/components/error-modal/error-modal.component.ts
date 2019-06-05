import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '../_bases/base-modal.component';

@Component({
  selector: 'ecp-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent extends BaseModalComponent {
  @Input()
  errorKey: string;
  @Input()
  stackTrace: string;

  constructor(activeModal: NgbActiveModal, elementRef: ElementRef, renderer: Renderer2) {
    super(activeModal, elementRef, renderer);
  }
}
