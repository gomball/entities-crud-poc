import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';
import { Employee } from '../domain/employee';
import { EndpointId } from './api-endpoint.service';
import { HttpDataService } from './http-data.service';
import { NavigationService } from './navigation.service';
import { StorageKeys, StorageService } from './storage.service';

@Injectable()
export class AuthService {
  get isAuthTokenValid(): boolean {
    const authToken = this._storageService.getSessionObject<any>(StorageKeys.SESSION_AUTH_TOKEN);
    return this._isAuthTokenValid(authToken);
  }

  constructor(
    private readonly _httpDataService: HttpDataService,
    private readonly _storageService: StorageService,
    private readonly _navigationService: NavigationService
  ) {}

  login$(tenant: string, username: string, password: string): Observable<void> {
    const url = EndpointId.GetToken;
    const data = { tenant, username, password, grant_type: 'password' };
    // => Commented because it's a stub, not a real api call
    // return this._httpDataService.postForm$(url, data).pipe(
    return this._httpDataService.get$(url).pipe(
      tap((authToken) => this._storageService.setSessionObject(StorageKeys.SESSION_AUTH_TOKEN, authToken)),
      switchMap(() => this._getActiveUser$()),
      tap((rsp) => this._storageService.setSessionObject(StorageKeys.SESSION_DATA, { user: rsp })),
      tap(() => this._navigationService.gotoMenu()),
      mapTo(null)
    );
  }

  logout(): void {
    this._storageService.clearSession();
    this._navigationService.gotoLogin();
  }

  private _isAuthTokenValid(authToken: any): boolean {
    // return !!authToken;
    return (
      !!authToken && !!authToken['.expires'] && new Date().toISOString().localeCompare(new Date(authToken['.expires']).toISOString()) < 0
    );
  }

  private _getActiveUser$(): Observable<Employee> {
    return this._httpDataService.odataGet$<Employee>('Employee', 1);
  }
}
