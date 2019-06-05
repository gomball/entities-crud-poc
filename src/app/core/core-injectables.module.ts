import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TranslateModule as NgxTranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { appInitFunctionFactory, coreConfigFactory, ngxTranslateModuleConfig } from './core-injectables.providers';
import { CoreServiceLocator } from './core-injectables.service-locator';
import { DomainDescriptionService } from './domain/services/domain-description.service';
import { SessionService } from './domain/services/session.service';
import { SettingsService } from './domain/services/settings.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthHttpInterceptorService } from './interceptors/auth-http-interceptor.service';
import { CallCounterHttpInterceptorService } from './interceptors/call-counter-http-interceptor.service';
import { ErrorHttpInterceptorService } from './interceptors/error-http-interceptor.service';
import { TransformHttpInterceptorService } from './interceptors/transform-http-interceptor.service';
import { ApiEndpointService } from './services/api-endpoint.service';
import { AuthService } from './services/auth.service';
import { CrossCuttingService } from './services/cross-cutting.service';
import { ExceptionService } from './services/exception.service';
import { HttpDataService } from './services/http-data.service';
import { I18nService } from './services/i18n.service';
import { ModalService } from './services/modal.service';
import { NavigationService } from './services/navigation.service';
import { NotificationService } from './services/notification.service';
import { ODataService } from './services/odata.service';
import { SerializationService } from './services/serialization.service';
import { StorageService } from './services/storage.service';
import { coreReducers } from './store/_core-reducers';
import { CoreConfig } from './types/core.config';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(coreReducers),
    NgxTranslateModule.forRoot(ngxTranslateModuleConfig),
    ToastrModule.forRoot()
  ],
  declarations: [],
  entryComponents: []
})
export class CoreInjectablesModule {
  constructor(
    @Optional()
    @SkipSelf()
    _parentModule: CoreInjectablesModule,
    injector: Injector
  ) {
    if (!!_parentModule) {
      console.error('"CoreModule" already loaded. Import it _ONLY_ on main "AppModule".');
    }
    CoreServiceLocator.injector = injector;
  }

  static forRoot(coreConfig: CoreConfig): ModuleWithProviders {
    return {
      ngModule: CoreInjectablesModule,
      providers: [
        {
          provide: '__INITIAL_CORE_CONFIG',
          useValue: coreConfig
        },
        {
          provide: CoreConfig,
          useFactory: coreConfigFactory,
          deps: ['__INITIAL_CORE_CONFIG']
        },
        // == HORIZONTAL ARCH SERVICES
        AuthService,
        ApiEndpointService,
        CrossCuttingService,
        ExceptionService,
        HttpDataService,
        I18nService,
        ModalService,
        NavigationService,
        NotificationService,
        ODataService,
        SerializationService,
        StorageService,
        // == CORE GUARDS ==
        AuthGuard,
        // == DOMAIN SERVICES ==
        DomainDescriptionService,
        SessionService,
        SettingsService,
        {
          provide: APP_BASE_HREF,
          useValue: environment.BASE_HREF
        },
        {
          provide: APP_INITIALIZER,
          useFactory: appInitFunctionFactory,
          deps: [I18nService, CoreConfig],
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptorService,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CallCounterHttpInterceptorService,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHttpInterceptorService,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TransformHttpInterceptorService,
          multi: true
        }
      ]
    };
  }
}
