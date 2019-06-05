import { forwardRef, Inject, Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiEndpointService } from '../../services/api-endpoint.service';
import { HttpDataService } from '../../services/http-data.service';
import { StorageKeys, StorageService } from '../../services/storage.service';
import { Employee } from '../employee';

export enum AppLanguage {
  en,
  es
}

export interface SessionData {
  user: any;
}

export const DEFAULT_APP_LANGUAGE: AppLanguage = AppLanguage.en;

@Injectable()
export class SessionService {
  get user(): Employee {
    const sessionData = this._storageService.getSessionObject<SessionData>(StorageKeys.SESSION_DATA);
    return _.get<SessionData, 'user'>(sessionData, 'user');
  }

  constructor(
    @Inject(forwardRef(() => NgxTranslateService)) private readonly _translateService: NgxTranslateService,
    @Inject(forwardRef(() => ApiEndpointService)) private readonly _apiEnpointService: ApiEndpointService,
    @Inject(forwardRef(() => HttpDataService)) private readonly _httpDataService: HttpDataService,
    @Inject(forwardRef(() => StorageService)) private readonly _storageService: StorageService
  ) {}

  preBoot(): Promise<any> {
    return !window.location.href.includes('/login')
      ? this._storeSessionData$()
          .pipe(tap(() => this._initLanguage()))
          .toPromise()
      : Promise.resolve();
  }

  private _storeSessionData$(storeData: boolean = true): Observable<any> {
    return this._getActiveUser$().pipe(
      map((data) => ({ user: data })),
      tap((sessionData: SessionData) => storeData && this._storageService.setSessionObject(StorageKeys.SESSION_DATA, sessionData))
    );
  }

  private _getActiveUser$(): Observable<Employee> {
    return this._httpDataService.odataGet$<Employee>('Employee', 1);
  }

  private _initLanguage(): void {
    const lang = this._translateService.getBrowserLang() || AppLanguage[DEFAULT_APP_LANGUAGE];
    this._translateService.use(lang.toString());
  }
}
