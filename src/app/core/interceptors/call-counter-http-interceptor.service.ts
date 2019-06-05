import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EndpointId } from '../services/api-endpoint.service';
import * as HttpCallCounter from '../store/http-calls-counter';

@Injectable()
export class CallCounterHttpInterceptorService implements HttpInterceptor {
  constructor(private readonly _store$: Store<any>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIntercept =
      req.url.startsWith(environment.REST_API_URL) ||
      req.url.startsWith(environment.SEARCH_API_URL) ||
      req.url.indexOf(EndpointId.GetToken) >= 0;
    if (shouldIntercept) {
      this._store$.dispatch(new HttpCallCounter.Increment());
      return next
        .handle(req)
        .pipe(
          tap(
            (event: any) => event instanceof HttpResponse && this._store$.dispatch(new HttpCallCounter.Decrement()),
            (error: any) => error instanceof HttpErrorResponse && this._store$.dispatch(new HttpCallCounter.Decrement())
          )
        );
    } else {
      return next.handle(req);
    }
  }
}
