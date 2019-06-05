import {
  MissingTranslationHandler as NgxMissingTranslationHandler,
  MissingTranslationHandlerParams as NgxMissingTranslationHandlerParams
} from '@ngx-translate/core';

export class CustomMissingTranslationHandler implements NgxMissingTranslationHandler {
  constructor(private _missingTranslationPrefix: string) {}

  handle(params: NgxMissingTranslationHandlerParams) {
    return this._missingTranslationPrefix + params.key;
  }
}
