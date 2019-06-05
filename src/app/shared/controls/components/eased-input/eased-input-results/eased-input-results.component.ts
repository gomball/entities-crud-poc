import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModalComponent } from '../../../../../core/components/_bases/base-modal.component';

@Component({
  selector: 'ecp-eased-input-search-results',
  templateUrl: './eased-input-results.component.html',
  styleUrls: ['./eased-input-results.component.scss']
})
export class EasedInputResultsModalComponent extends BaseModalComponent {
  @Input()
  list: any[];
  @Input()
  properties: [string, string] = ['code', 'name'];

  constructor(activeModal: NgbActiveModal, elementRef: ElementRef, renderer: Renderer2) {
    super(activeModal, elementRef, renderer);
  }
}
