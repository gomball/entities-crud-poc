import { NgModule } from '@angular/core';
import { CoreDeclarablesModule } from '../../core/core-declarables.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [MenuRoutingModule, CoreDeclarablesModule],
  declarations: [MenuComponent],
  exports: []
})
export class MenuModule {}
