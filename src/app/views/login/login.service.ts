import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class LoginService {
  constructor(private readonly _authService: AuthService) {}

  login$(tenantName: string, userName: string, password: string): Observable<void> {
    return this._authService.login$(tenantName, userName, password).pipe(mapTo(null));
  }

  logout(): void {
    this._authService.logout();
  }
}
