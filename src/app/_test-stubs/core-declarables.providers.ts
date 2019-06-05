import { Component, EventEmitter, NgModule, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ecp-core-grid',
  template: '<span></span>',
  exportAs: 'gridComponent'
})
export class GridStubComponent {
  readonly id: 'gridStub';
  options: any;
  data: any[];
  ready = new EventEmitter<void>();
  widget: any;
  gridOptions: any;
  gridStateName: string;
  gridStateNames: string[];
}

@NgModule({
  declarations: [GridStubComponent],
  exports: [GridStubComponent]
})
export class SharedGridStubModule {}

@Component({
  selector: 'ecp-core-datepicker',
  template: '<input [(ngModel)]="model">'
})
export class DatepickerStubComponent {
  model: any;
}
@Component({
  selector: 'ecp-core-eased-input',
  template: '<input [(ngModel)]="model">'
})
export class EasedInputStubComponent {
  model: any;
}
@Component({
  selector: 'ecp-core-input',
  template: '<input [(ngModel)]="model">'
})
export class InputStubComponent {
  model: any;
}
@Component({
  selector: 'ecp-core-select',
  template: '<select [(ngModel)]="model"></select>'
})
export class SelectStubComponent {
  model: any;
  @Input()
  collection: any[];
  @Input()
  translateDescription: boolean;
}
@NgModule({
  imports: [FormsModule],
  declarations: [DatepickerStubComponent, EasedInputStubComponent, InputStubComponent, SelectStubComponent],
  exports: [DatepickerStubComponent, EasedInputStubComponent, InputStubComponent, SelectStubComponent]
})
export class SharedControlStubModule {}
