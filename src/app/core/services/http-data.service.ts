import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from '../domain/_types/entity';
import { EntityFilterSet } from '../domain/_types/entity-filter';
import { CustomHttpParameterCodec } from '../types/custom-http-parameter-codec';
import { ApiEndpointService, EndpointId } from './api-endpoint.service';
import { ODataSearchResponse, ODataService } from './odata.service';

@Injectable()
export class HttpDataService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _apiEndpointsService: ApiEndpointService,
    private readonly _odataQueryService: ODataService
  ) {}

  get$<T>(url: string, data?: any): Observable<T> {
    const params = this._getHttpParams(data);
    return this._httpClient.get<T>(url, { params });
  }

  getData$<T>(endpointId: EndpointId, restId: string | number = null, data: any = {}): Observable<T> {
    const url = this._getFullApiUrl(endpointId, restId);
    return this.get$<T>(url, data);
  }

  post$<T>(url: string, data: any): Observable<any> {
    const headers = this._getHttpHeaders('post');
    return this._httpClient.post<T>(url, data, { headers });
  }

  postData$<T>(endpointId: EndpointId, data: any): Observable<any> {
    const url = this._getFullApiUrl(endpointId);
    return this.post$<T>(url, data);
  }

  postForm$<T>(url: string, data: any): Observable<any> {
    const body = this._getHttpParams(data).toString();
    const headers = this._getHttpHeaders('postForm');
    return this._httpClient.post<T>(url, body, { headers });
  }

  put$<T>(url: string, data: any): Observable<any> {
    const headers: HttpHeaders = this._getHttpHeaders('post');
    return this._httpClient.put<T>(url, data, { headers });
  }

  putData$<T>(endpointId: EndpointId, restId: string | number, data: any): Observable<any> {
    const url = this._getFullApiUrl(endpointId, restId);
    return this.put$<T>(url, data);
  }

  delete$<T>(url: string): Observable<any> {
    const headers = this._getHttpHeaders('post');
    return this._httpClient.delete<T>(url, { headers });
  }

  deleteData$<T>(endpointId: EndpointId, restId: string | number): Observable<any> {
    const url = this._getFullApiUrl(endpointId, restId);
    return this.delete$<T>(url);
  }

  odataQuery$<T extends Entity>(entityName: string, properties?: string[], filters?: EntityFilterSet): Observable<T[]> {
    const qs = this._odataQueryService.getODataQueryString('search', properties, filters);
    return this.get$<ODataSearchResponse<T>>(`${this._apiEndpointsService.getSearchEndpoint(entityName)}${qs}`).pipe(
      map((rsp) => rsp.value)
    );
  }

  odataGet$<T extends Entity>(entityName: string, id: string | number, expands: string[] = []): Observable<T> {
    return this.get$<ODataSearchResponse<T>>(`${this._apiEndpointsService.getSearchEndpoint(entityName)}(${id})`).pipe(
      map((rsp) => rsp.value),
      map((rsp) => _.first(rsp))
    );
  }

  private _getHttpParams(data: any): HttpParams {
    let retVal = new HttpParams({ encoder: new CustomHttpParameterCodec() });
    _.forEach(data, (v: string, k: string) => (retVal = retVal.set(k, v)));
    return retVal;
  }

  private _getHttpHeaders(...headerGroup: ('post' | 'postForm')[]): HttpHeaders {
    let retVal = new HttpHeaders();
    if (headerGroup.indexOf('post') >= 0) {
      retVal = retVal.set('Content-Type', 'application/json');
    }
    if (headerGroup.indexOf('postForm') >= 0) {
      retVal = retVal.set('Content-Type', 'application/x-www-form-urlencoded');
    }
    return retVal;
  }

  private _getFullApiUrl(endpointId: EndpointId, restId?: string | number): string {
    const endpointUrl = this._apiEndpointsService.getApiEndpoint(endpointId);
    return !!restId ? `${endpointUrl}/${restId}` : endpointUrl;
  }
}
