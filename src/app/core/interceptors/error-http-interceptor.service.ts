import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ExceptionService } from '../services/exception.service';

@Injectable()
export class ErrorHttpInterceptorService implements HttpInterceptor {
  constructor(@Inject(forwardRef(() => ExceptionService)) private readonly _exceptionService: ExceptionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIntercept = req.url.startsWith(environment.REST_API_URL) || req.url.startsWith(environment.SEARCH_API_URL);
    if (shouldIntercept) {
      return next.handle(req).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status >= 400) {
            return this._exceptionService.processBackendException$(error);
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
