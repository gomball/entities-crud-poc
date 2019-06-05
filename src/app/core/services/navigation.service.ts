import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, noop, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreServiceLocator } from '../core-injectables.service-locator';

@Injectable()
export class NavigationService {
  private get _router(): Router {
    return CoreServiceLocator.injector.get(Router);
  }

  absoluteGoto$(...path: (string | number)[]): Observable<boolean> {
    return from(this._router.navigate(path));
  }
  absoluteGoto(...path: (string | number)[]): void {
    this.absoluteGoto$(...path).subscribe();
  }

  relativeGoto$(relativeTo: ActivatedRoute, ...path: (string | number)[]): Observable<boolean> {
    return from(this._router.navigate(path, { relativeTo }));
  }
  relativeGoto(relativeTo: ActivatedRoute, ...path: (string | number)[]): void {
    this.relativeGoto(relativeTo, ...path);
  }

  gotoLogin(reloadAlso: boolean = true): void {
    this._goto('login', reloadAlso);
  }

  gotoMenu(): void {
    this._goto('menu', false);
  }

  private _goto(path: string, reloadAlso: boolean = true): void {
    this.absoluteGoto$(path)
      .pipe(tap(() => (reloadAlso ? window.location.reload() : noop())))
      .subscribe();
  }
}
