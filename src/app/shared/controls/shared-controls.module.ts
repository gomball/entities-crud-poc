import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderModule } from 'angular2-query-builder';
import { CoreDeclarablesModule } from '../../core/core-declarables.module';
import { ModalService } from '../../core/services/modal.service';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { EasedInputInfoModalComponent } from './components/eased-input/eased-input-info/eased-input-info.component';
import { EasedInputResultsModalComponent } from './components/eased-input/eased-input-results/eased-input-results.component';
import { EasedInputComponent } from './components/eased-input/eased-input.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { ControlLayoutDirective } from './directives/control-layout.directive';
import { QueryFilterBuilderComponent } from './query-filter-builder/query-filter-builder.component';

const ENTRY_COMPONENTS = [EasedInputInfoModalComponent, EasedInputResultsModalComponent];
const COMPONENTS = [
  ControlLayoutDirective,
  DatepickerComponent,
  EasedInputComponent,
  EasedInputInfoModalComponent,
  EasedInputResultsModalComponent,
  InputComponent,
  QueryFilterBuilderComponent,
  SelectComponent,
  ...ENTRY_COMPONENTS
];

@NgModule({
  imports: [FormsModule, QueryBuilderModule, ReactiveFormsModule, CoreDeclarablesModule],
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [FormsModule, ReactiveFormsModule, ...COMPONENTS],
  providers: [ModalService]
})
export class SharedControlsModule {}
