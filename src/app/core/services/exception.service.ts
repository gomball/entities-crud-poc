import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { EMPTY, from, Observable, of, pipe, throwError } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { ModalService } from './modal.service';
import { NotificationService } from './notification.service';

interface ErrorDefinition {
  showMessage: boolean;
  nextAction: 'CONTINUE' | 'RETHROW' | 'STOP' | 'RELOAD_APP' | 'EXIT_APP';
}

interface ErrorDefinitionMap {
  [ex: string]: ErrorDefinition;
}

const SERVER_DOMAIN_EXCEPTIONS: ErrorDefinitionMap = {
  'App.Core.....Exceptions.AuthInvalidException': {
    showMessage: true,
    nextAction: 'CONTINUE'
  }
};

@Injectable()
export class ExceptionService {
  constructor(
    private readonly _router: Router,
    private readonly _modalService: ModalService,
    private readonly _notificationService: NotificationService
  ) {}

  processBackendException$(httpError: HttpErrorResponse): Observable<any> {
    const errorCode: number = httpError.status;
    const errorMessage: string = _.trim(httpError.error || httpError.message, '"') || null;

    const reloadAndStopApplication0 = pipe(
      tap(() => window.location.reload()),
      switchMap(() => EMPTY)
    );
    switch (errorCode) {
      case 401:
        if (!this._router.url.includes('login')) {
          return this._openErrorModal('exceptions.sessionExpired', errorMessage).pipe(
            switchMap(() => from(this._router.navigate(['/login']))),
            reloadAndStopApplication0
          );
        } else {
          return of(true);
        }
      case 0:
        console.error(errorCode, errorMessage);
        return this._openErrorModal('exceptions.networkDown', errorMessage).pipe(reloadAndStopApplication0);
    }

    const errorData: ErrorDefinition = SERVER_DOMAIN_EXCEPTIONS[errorMessage] || SERVER_DOMAIN_EXCEPTIONS['unhandledDomainException'];
    switch (errorCode) {
      case 400:
        setTimeout(() => this._notificationService.hideSpinner(), 1000);
        console.warn(errorCode, errorMessage);
        return (errorData.showMessage ? this._openErrorModal(`exceptions.${errorMessage}`, errorMessage) : of(true)).pipe(
          switchMap(() => {
            if (errorData.nextAction === 'STOP') {
              return EMPTY;
            } else if (errorData.nextAction === 'RELOAD_APP') {
              of(true).pipe(reloadAndStopApplication0);
            } else if (errorData.nextAction === 'EXIT_APP') {
              return from(this._router.navigate(['/login'])).pipe(reloadAndStopApplication0);
            } else if (errorData.nextAction === 'CONTINUE') {
              return of(true);
            } else if (errorData.nextAction === 'RETHROW') {
              return throwError(httpError);
            }
          })
        );
      case 500:
        console.error(errorCode, errorMessage);
        return this._openErrorModal(errorMessage).pipe(reloadAndStopApplication0);
    }

    console.error(errorCode, errorMessage);
    return this._openErrorModal('exceptions.unknownError', errorMessage).pipe(reloadAndStopApplication0);
  }

  private _openErrorModal(errorKey: string, stackTrace?: string): Observable<boolean> {
    return this._modalService.custom$(ErrorModalComponent, { errorKey, stackTrace }).pipe(mapTo(true));
  }
}
