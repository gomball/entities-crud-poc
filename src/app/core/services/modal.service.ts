import { Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { forIn } from 'lodash';
import { from, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { PromptModalComponent, PromptModalReturnValue } from '../components/prompt-modal/prompt-modal.component';
import { BaseModalComponent } from '../components/_bases/base-modal.component';
import { BaseSimpleModalComponent } from '../components/_bases/base-simple-modal.component';

const DEFAULT_MODAL_OPTIONS: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false
};

@Injectable()
export class ModalService {
  constructor(private _modalService: NgbModal) {}

  alert$(messageKey: string, titleKey?: string, translateParams?: any): Observable<boolean> {
    const modalRef = this._simpleModal<AlertModalComponent>(AlertModalComponent, messageKey, titleKey || 'warning', translateParams || {});
    return from(modalRef.result).pipe(first());
  }

  alert(messageKey: string, titleKey?: string, translateParams?: any): void {
    this.alert$(messageKey, titleKey, translateParams).subscribe();
  }

  confirm$(messageKey: string, titleKey?: string, translateParams?: any): Observable<boolean> {
    const modalRef = this._simpleModal<ConfirmModalComponent>(
      ConfirmModalComponent,
      messageKey,
      titleKey || 'confirmation',
      translateParams || {}
    );
    return from(modalRef.result).pipe(first());
  }

  prompt$<R>(messageKey: string, titleKey?: string, translateParams?: any, inputs?: any): Observable<PromptModalReturnValue<R>> {
    const modalRef = this._simpleModal<PromptModalComponent<R>>(
      PromptModalComponent,
      messageKey,
      titleKey || 'prompt',
      translateParams || {}
    );
    forIn(inputs || {}, (v, k) => (modalRef.componentInstance[k] = v));
    return from(modalRef.result).pipe(first());
  }

  private _simpleModal<T extends BaseSimpleModalComponent>(
    type: Type<T>,
    messageKey: string,
    titleKey: string,
    translateParams?: any
  ): NgbModalRef {
    const modalRef = this._modalService.open(type, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.messageKey = messageKey;
    modalRef.componentInstance.titleKey = titleKey;
    modalRef.componentInstance.translateParams = translateParams;
    return modalRef;
  }

  custom$<T extends BaseModalComponent, R>(componentType: Type<T>, inputs?: any, options?: Partial<NgbModalOptions>): Observable<R> {
    const modalRef = this._modalService.open(componentType, Object.assign({}, DEFAULT_MODAL_OPTIONS, options));
    forIn(inputs || {}, (v, k) => (modalRef.componentInstance[k] = v));
    return from(modalRef.result).pipe(first());
  }
}
