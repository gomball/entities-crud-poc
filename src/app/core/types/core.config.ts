import { Injectable } from '@angular/core';
import { ViewportLayout } from './viewport-layout';

@Injectable()
export class CoreConfig {
  appName: string;
  langFileUrls: { [langCode: string]: string[] };
  viewportLayout?: ViewportLayout;
}
