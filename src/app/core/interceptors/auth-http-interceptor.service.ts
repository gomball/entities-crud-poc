import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageKeys, StorageService } from '../services/storage.service';

@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {
  private get authHeaderValue(): string {
    const authToken = this._storageService.getSessionObject<{ token_type: string; access_token: string }>(StorageKeys.SESSION_AUTH_TOKEN);
    return !!authToken ? `${authToken.token_type} ${authToken.access_token}` : '';
  }

  constructor(private _storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIntercept =
      !req.url.includes('/login/') &&
      (req.url.startsWith(environment.REST_API_URL) || req.url.startsWith(environment.SEARCH_API_URL));
    if (shouldIntercept) {
      return next.handle(req.clone({ setHeaders: { Authorization: this.authHeaderValue } }));
    } else {
      return next.handle(req);
    }
  }
}
