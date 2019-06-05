import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreDeclarablesModule } from '../../core/core-declarables.module';
import { ComponentRendererComponent } from './components/component-renderer/component-renderer.component';
import { EntityEditBodyComponent } from './components/entity-edit-body/entity-edit-body.component';
import { EntityEditSidebarComponent } from './components/entity-edit-sidebar/entity-edit-sidebar.component';
import { EntityEditSidebarTabComponent } from './components/entity-edit-sidebar/tab/entity-edit-sidebar-tab.component';
import { EntityEditToolbarComponent } from './components/entity-edit-toolbar/entity-edit-toolbar.component';
import { EntityListToolbarComponent } from './components/entity-list-toolbar/entity-list-toolbar.component';
import { SlideBandButtonComponent } from './components/slide-band/button/slide-band-button.component';
import { SlideBandComponent } from './components/slide-band/slide-band.component';
import { SlideBandService } from './components/slide-band/slide-band.service';

const COMPONENTS = [
  ComponentRendererComponent,
  EntityEditBodyComponent,
  EntityEditSidebarComponent,
  EntityEditSidebarTabComponent,
  EntityEditToolbarComponent,
  EntityListToolbarComponent,
  SlideBandComponent,
  SlideBandButtonComponent
];

const PROVIDERS = [
  SlideBandService
];

@NgModule({
  imports: [CoreDeclarablesModule],
  declarations: [...COMPONENTS],
  exports: [RouterModule, ...COMPONENTS],
  providers: [...PROVIDERS]
})
export class SharedLayoutModule {}
