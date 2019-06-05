import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { I18nService } from '../../services/i18n.service';
import { BaseSimpleModalComponent } from '../_bases/base-simple-modal.component';

@Component({
  selector: 'ecp-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent extends BaseSimpleModalComponent {
  constructor(activeModal: NgbActiveModal, elementRef: ElementRef, renderer: Renderer2, i18nService: I18nService) {
    super(activeModal, elementRef, renderer, i18nService);
  }
}
