import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SerializationService } from '../services/serialization.service';

@Injectable()
export class TransformHttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIntercept = req.url.startsWith(environment.REST_API_URL) || req.url.startsWith(environment.SEARCH_API_URL);
    if (shouldIntercept) {
      return next
        .handle(req.clone({ body: SerializationService.js2json(req.body) }))
        .pipe(
          map((event: any) => (event instanceof HttpResponse ? event.clone({ body: SerializationService.json2js(event.body) }) : event))
        );
    } else {
      return next.handle(req);
    }
  }
}
