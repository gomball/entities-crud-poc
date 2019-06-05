import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { chain } from 'lodash';
import { CoreServiceLocator } from '../core-injectables.service-locator';
import { CoreConfig } from '../types/core.config';
import { AuthService } from './auth.service';
import { HttpDataService } from './http-data.service';
import { I18nService } from './i18n.service';
import { ModalService } from './modal.service';
import { NavigationService } from './navigation.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';

@Injectable()
export class CrossCuttingService {
  get router(): Router {
    return CoreServiceLocator.injector.get(Router);
  }

  get routeBasedId(): string {
    return chain(this.router.url)
      .split('/')
      .filter((p) => !!p)
      .join('-')
      .camelCase()
      .value();
  }

  constructor(
    public readonly auth: AuthService,
    public readonly config: CoreConfig,
    public readonly http: HttpDataService,
    public readonly i18n: I18nService,
    public readonly modal: ModalService,
    public readonly navigation: NavigationService,
    public readonly notification: NotificationService,
    public readonly storage: StorageService
  ) {}

  noop(): void {}
}
