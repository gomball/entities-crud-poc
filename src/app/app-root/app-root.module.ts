import { NgModule } from '@angular/core';
import { CoreDeclarablesModule } from '../core/core-declarables.module';
import { CoreInjectablesModule } from '../core/core-injectables.module';
import { CoreConfig } from '../core/types/core.config';
import { LoginModule } from '../views/login/login.module';
import { MenuModule } from '../views/menu/menu.module';
import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root.component';

const coreConfig: CoreConfig = {
  appName: 'entities-crud-poc',
  langFileUrls: { es: ['assets/i18n/es/translations.json'] }
};

@NgModule({
  declarations: [AppRootComponent],
  imports: [CoreInjectablesModule.forRoot(coreConfig), CoreDeclarablesModule, AppRootRoutingModule, LoginModule, MenuModule],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppRootModule {}
