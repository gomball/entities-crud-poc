import { Component, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseControlComponent } from '../_bases/base-control.component';

@Component({
  selector: 'ecp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
  // providers: [{
  //   provide: NG_VALUE_ACCESSOR,
  //   useExisting: forwardRef(() => InputComponent),
  //   multi: true
  // }]
})
export class InputComponent extends BaseControlComponent {
  private _model: any;
  @Input()
  type: 'text' | 'number' = 'text';

  get model(): any {
    return this._model;
  }

  set model(value: any) {
    this._model = value;
    this.emitChange(value || null);
    this.emitTouched();
  }

  constructor(ngControl: NgControl, elementRef: ElementRef) {
    super(ngControl, elementRef);
  }

  writeValue(value: any) {
    this._model = value;
  }
}
