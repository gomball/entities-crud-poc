import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

export type AppLocale = 'en' | 'es';

export interface AppDateFormats {
  forFormat: string;
  forParse: string;
}

export type AppLocaleDateFormatMap = { [propName in AppLocale]: AppDateFormats };

export const APP_DATE_FORMATS: AppLocaleDateFormatMap = {
  en: { forFormat: 'MM/dd/yyyy', forParse: 'M/d/y' },
  es: { forFormat: 'dd/MM/yyyy', forParse: 'd/M/y' }
};

export const DEFAULT_LANG: AppLocale = 'es';

@Injectable()
export class I18nService {
  private _currentLocale: AppLocale;

  get currentLocale(): AppLocale {
    return this._currentLocale;
  }

  get currentLocaleDateFormats(): AppDateFormats {
    return APP_DATE_FORMATS[this._currentLocale];
  }

  constructor(private readonly _httpClient: HttpClient, private readonly _ngxTranslateService: NgxTranslateService) {
    this._currentLocale = DEFAULT_LANG;
  }

  translate(key: string, params?: Object): string {
    return !!key ? this._ngxTranslateService.instant(key, params) : '';
  }

  setLocale$(lang?: AppLocale): Observable<any> {
    this._currentLocale = lang || DEFAULT_LANG;
    return this._ngxTranslateService.use((lang || DEFAULT_LANG).toString());
  }

  loadLanguages$(langFileUrls: { [langCode: string]: string[] }): Observable<any> {
    const obsList$ = _.chain(langFileUrls)
      .mapValues((v, k) => this.loadLanguage(k, v))
      .values()
      .map((o) => o.pipe(first()))
      .value();
    return forkJoin<any>(...obsList$);
  }

  loadLanguage(langCode: string, fileUrls: string[]): Observable<any> {
    const langData = {};
    if (!!fileUrls && !!fileUrls.length) {
      const langFileRequests$ = _.map(fileUrls, (url) => this._httpClient.get<any>(url).pipe(first()));
      return forkJoin<any>(...langFileRequests$).pipe(
        tap((tt: any[]) => tt.forEach((t) => Object.assign(langData, t))),
        tap(() => this._ngxTranslateService.setTranslation(langCode || DEFAULT_LANG, langData, false)),
        map(() => langData)
      );
    } else {
      return of({});
    }
  }
}
