import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<any> {
  constructor(private readonly _authService: AuthService, private readonly _modalService: ModalService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthTokenValid) {
      return of(true);
    } else {
      return this._modalService.alert$('messages.sessionExpired').pipe(
        tap(() => this._authService.logout()),
        mapTo(false)
      );
    }
  }

  canDeactivate(
    component: any,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
