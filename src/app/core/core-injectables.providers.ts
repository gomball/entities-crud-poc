import {
  MissingTranslationHandler as NgxMissingTranslationHandler,
  TranslateModuleConfig as NgxTranslateModuleConfig
} from '@ngx-translate/core';
import { defaults } from 'lodash';
import { of } from 'rxjs';
import { I18nService } from './services/i18n.service';
import { CoreConfig } from './types/core.config';
import { CustomMissingTranslationHandler } from './types/custom-missing-translation-handler';
import { DEFAULT_VIEWPORT_LAYOUT } from './types/viewport-layout';

export const coreConfigFactory = (coreConfig) => defaults(coreConfig, { viewportLayout: DEFAULT_VIEWPORT_LAYOUT });

export const appInitFunctionFactory = (i18nService: I18nService, coreConfig: CoreConfig): (() => Promise<any>) => () =>
  of(true)
    .toPromise()
    .then(() => i18nService.loadLanguages$(coreConfig.langFileUrls).toPromise())
    .then(() => i18nService.setLocale$().toPromise());

export const customMissingTranslationHandlerFactory = (): CustomMissingTranslationHandler => new CustomMissingTranslationHandler('!');

export const ngxTranslateModuleConfig: NgxTranslateModuleConfig = {
  missingTranslationHandler: {
    provide: NgxMissingTranslationHandler,
    useFactory: customMissingTranslationHandlerFactory
  }
};
