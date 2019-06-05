import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LicenseManager } from 'ag-grid-enterprise';
import { AppRootModule } from './app/app-root/app-root.module';
import './app/core/lang-extensions/extensions';
import { environment } from './environments/environment';

LicenseManager.setLicenseKey('TBC');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppRootModule)
  .catch((err) => console.error(err));
