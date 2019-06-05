import { Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DomainDescriptionService } from '../core/domain/services/domain-description.service';
import { SessionService } from '../core/domain/services/session.service';
import { SettingsService } from '../core/domain/services/settings.service';
import { ApiEndpointService } from '../core/services/api-endpoint.service';
import { AuthService } from '../core/services/auth.service';
import { CrossCuttingService } from '../core/services/cross-cutting.service';
import { ExceptionService } from '../core/services/exception.service';
import { HttpDataService } from '../core/services/http-data.service';
import { I18nService } from '../core/services/i18n.service';
import { ModalService } from '../core/services/modal.service';
import { NavigationService } from '../core/services/navigation.service';
import { NotificationService } from '../core/services/notification.service';
import { ODataService } from '../core/services/odata.service';
import { StorageService } from '../core/services/storage.service';
import { CoreConfig } from '../core/types/core.config';
import { DEFAULT_VIEWPORT_LAYOUT } from '../core/types/viewport-layout';

export const CORE_CONFIG_STUB_PROVIDER: Provider = {
  provide: CoreConfig,
  useValue: {
    appName: '',
    modulesConfigurationMap: {
      base: [
        { key: 'inbound' },
        { key: 'inboundItem' },
        { key: 'inboundInstruction', implemented: false },
        { key: 'inboundInstructionItem', implemented: false },
        { key: 'operation', implemented: false },
        { key: 'vehicle' }
      ],
      tfUk: [{ key: 'vehicle' }]
    },
    langFileUrls: { en: [] },
    viewportLayout: DEFAULT_VIEWPORT_LAYOUT
  }
};

export class ApiEndpointsStubService {}
export const API_ENDPOINT_STUB_SERVICE_PROVIDER: Provider = {
  provide: ApiEndpointService,
  useClass: ApiEndpointsStubService
};

export class AuthStubService {}
export const AUTH_STUB_SERVICE_PROVIDER: Provider = {
  provide: AuthService,
  useClass: AuthStubService
};

export class ExceptionStubService {}
export const EXCEPTION_STUB_SERVICE_PROVIDER: Provider = {
  provide: ExceptionService,
  useClass: ExceptionStubService
};

export class I8StubService {
  translate = (key: string) => '!' + key;
}
export const I18N_STUB_SERVICE_PROVIDER: Provider = {
  provide: I18nService,
  useClass: I8StubService
};

export class HttpDataStubService {}
export const HTTP_DATA_STUB_SERVICE_PROVIDER: Provider = {
  provide: HttpDataService,
  useClass: HttpDataStubService
};

export class ModalStubService {
  prompt$ = (): Observable<any> => of({ accepted: true, value: 'testValue' });
}
export const MODAL_STUB_SERVICE_PROVIDER: Provider = {
  provide: ModalService,
  useClass: ModalStubService
};

export class NavigationStubService {}
export const NAVIGATION_STUB_SERVICE_PROVIDER: Provider = {
  provide: NavigationService,
  useClass: NavigationStubService
};

export class NotificationStubService {}
export const NOTIFICATION_STUB_SERVICE_PROVIDER: Provider = {
  provide: NotificationService,
  useClass: NotificationStubService
};

export class StorageStubService {
  private _store: any = {};
  getLocalValue = (key: string): string | number | boolean => this._store[key];
  setLocalValue = (key: string, value: string | number | boolean): void => {
    this._store[key] = value;
  }
  getLocalObject = <T>(key: string): T => this._store[key];
  setLocalObject = <T>(key: string, value: T): void => {
    this._store[key] = value;
  }
  removeLocalItem = (key: string): void => {
    delete this._store[key];
  }
  getSessionValue = (key: string): string | number | boolean => this._store[key];
  setSessionValue = (key: string, value: string | number | boolean): void => {
    this._store[key] = value;
  }
  getSessionObject = <T>(key: string): T => this._store[key];
  setSessionObject = <T>(key: string, value: T): void => {
    this._store[key] = value;
  }
  removeSessionItem = (key: string): void => {
    delete this._store[key];
  }
}
export const STORAGE_STUB_SERVICE_PROVIDER: Provider = {
  provide: StorageService,
  useClass: StorageStubService
};

export class CrossCuttingStubService {
  readonly router = { events: of({}) };
  readonly routeBasedId = 'testEntity';
  readonly auth;
  readonly config = { viewportLayout: DEFAULT_VIEWPORT_LAYOUT };
  readonly http;
  readonly i18n = new I8StubService();
  readonly modal = new ModalStubService();
  readonly storage = new StorageStubService();
}
export const CROSS_CUTTING_STUB_SERVICE_PROVIDER: Provider = {
  provide: CrossCuttingService,
  useClass: CrossCuttingStubService
};

// == DOMAIN =======

export class DomainDescriptionStubService {}
export const DOMAIN_DESCRIPTION_STUB_SERVICE_PROVIDER: Provider = {
  provide: DomainDescriptionService,
  useClass: DomainDescriptionStubService
};

export class ODataStubService {}
export const ODATA_STUB_SERVICE_PROVIDER: Provider = {
  provide: ODataService,
  useClass: ODataStubService
};

export class SessionStubService {}
export const SESSION_STUB_SERVICE_PROVIDER: Provider = {
  provide: SessionService,
  useClass: SessionStubService
};

export class SettingsStubService {
  getFromWarehouse$ = (): Observable<any> => of({});
}
export const SETTINGS_STUB_SERVICE_PROVIDER: Provider = {
  provide: SettingsService,
  useClass: SettingsStubService
};
