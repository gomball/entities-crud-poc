import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as SpinnerMessage from '../store/spinner-message';
import { I18nService } from './i18n.service';
import { ModalService } from './modal.service';

export const DEFAULT_SPINNER_MESSAGE_KEY = 'pleaseWait';

const DEFAULT_TOAST_OPTIONS: Partial<IndividualConfig> = {
  timeOut: 3000
};

@Injectable()
export class NotificationService {
  readonly spinnerMessage$: Observable<string>;
  readonly pendingHttpCall$: Observable<boolean>;

  constructor(
    private readonly _store: Store<any>,
    private readonly _toastService: ToastrService,
    private readonly _modalService: ModalService,
    private readonly _i18nService: I18nService
  ) {
    this.spinnerMessage$ = this._store.select<string>('spinnerMessage');
    this.pendingHttpCall$ = this._store.select<number>('httpCallsCounter').pipe(map((httpCallsCount) => httpCallsCount > 0));
  }

  alert(messageKey: string): Observable<boolean> {
    return this._modalService.alert$(messageKey);
  }

  confirm(messageKey: string): Observable<boolean> {
    return this._modalService.confirm$(messageKey);
  }

  toastSuccess(messageKey?: string, messageParams?: any): Observable<any> {
    return this._toast('success', messageKey, messageParams);
  }

  toastInfo(messageKey?: string, messageParams?: any): Observable<any> {
    return this._toast('info', messageKey, messageParams);
  }

  toastWarning(messageKey?: string, messageParams?: any): Observable<any> {
    return this._toast('warning', messageKey, messageParams);
  }

  toastError(messageKey?: string, messageParams?: any): Observable<any> {
    return this._toast('error', messageKey, messageParams);
  }

  private _toast(method: 'success' | 'info' | 'warning' | 'error', messageKey?: string, messageParams?: any): Observable<any> {
    const message = this._i18nService.translate(messageKey, messageParams);
    return this._toastService[method](message, null, DEFAULT_TOAST_OPTIONS).onHidden;
  }

  showSpinner(keyOrMessage: string = DEFAULT_SPINNER_MESSAGE_KEY, translateParams: any = {}): void {
    const message = this._i18nService.translate(keyOrMessage, translateParams);
    this._store.dispatch(new SpinnerMessage.Show(message));
  }

  hideSpinner(): void {
    this._store.dispatch(new SpinnerMessage.Hide());
  }

  reloadApp(): void {
    window.location.reload();
  }
}
