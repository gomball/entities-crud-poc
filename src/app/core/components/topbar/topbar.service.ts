import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd } from '@angular/router';
import { chain } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../domain/services/session.service';
import { CrossCuttingService } from '../../services/cross-cutting.service';
import { GUID_REGEXP } from '../../types/constants';

@Injectable()
export class TopbarService {
  isTopbarVisible$: Observable<boolean>;
  breadcrumbs$: Observable<string>;

  constructor(private readonly _titleService: Title, private readonly _xcs: CrossCuttingService, public readonly session: SessionService) {
    this.isTopbarVisible$ = this._xcs.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects.indexOf('/login') < 0)
    );
    this.breadcrumbs$ = this._xcs.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => this._mapUrlToBreadcrumbs(event.urlAfterRedirects)),
      tap((breadcrumbs) => this._titleService.setTitle('APP ' + breadcrumbs))
    );
  }

  gotoMenu(): void {
    if (environment.production) {
      window.close();
    } else {
      this._xcs.navigation.gotoMenu();
    }
  }

  private _mapUrlToBreadcrumbs(url: string): string {
    let parts = this._getUrlParts(url);
    parts = parts.map((part) => (GUID_REGEXP.test(part) ? 'mainData' : part));
    const iomd = parts.indexOf('mainData'); // index of main data
    if (iomd > 0 && iomd !== parts.length - 1) {
      parts.splice(iomd, 1);
    }
    parts = parts.map((part) => this._xcs.i18n.translate(part));
    return parts.join(' > ');
  }

  private _getUrlParts(url: string): string[] {
    return chain(url)
      .trim('/')
      .split('/')
      .filter((part) => ['list', 'edit', 'form'].indexOf(part) < 0)
      .value();
  }
}
