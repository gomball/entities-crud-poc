import { NgModule } from '@angular/core';
import { CoreDeclarablesModule } from '../../../core/core-declarables.module';
import { SharedControlsModule } from '../../../shared/controls/shared-controls.module';
import { SharedGridModule } from '../../../shared/grid/shared-grid.module';
import { SharedLayoutModule } from '../../../shared/layout/shared-layout.module';
import { CategoryListComponent } from './category-list.component';
import { CategoryListService } from './category-list.service';

@NgModule({
  imports: [CoreDeclarablesModule, SharedLayoutModule, SharedGridModule, SharedControlsModule],
  declarations: [CategoryListComponent],
  exports: [CategoryListComponent],
  providers: [CategoryListService]
})
export class CategoryListModule {}
