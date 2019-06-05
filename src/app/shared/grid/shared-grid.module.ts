import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { QueryBuilderModule } from 'angular2-query-builder';
import { CoreDeclarablesModule } from '../../core/core-declarables.module';
import { SharedControlsModule } from '../controls/shared-controls.module';
import { DateGridFilterComponent } from './grid-filters/date-grid-filter/date-grid-filter.component';
import { NumberGridFilterComponent } from './grid-filters/number-grid-filter/number-grid-filter.component';
import { TextGridFilterComponent } from './grid-filters/text-grid-filter/text-grid-filter.component';
import { GridComponent } from './grid.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([DateGridFilterComponent, NumberGridFilterComponent, TextGridFilterComponent]),
    NgbTooltipModule,
    QueryBuilderModule,
    CoreDeclarablesModule,
    SharedControlsModule
  ],
  declarations: [GridComponent, DateGridFilterComponent, NumberGridFilterComponent, TextGridFilterComponent],
  exports: [GridComponent],
  providers: []
})
export class SharedGridModule {}
