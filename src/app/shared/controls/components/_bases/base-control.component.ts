import { ElementRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export abstract class BaseControlComponent implements OnInit, ControlValueAccessor {
  @Input()
  label: string;
  @Input()
  helpText: string;

  get isControlValid(): boolean {
    return this._ngControl.valid;
  }
  emitChange: any;
  emitTouched: any;

  constructor(private readonly _ngControl: NgControl, private readonly _elementRef: ElementRef) {
    this._ngControl.valueAccessor = this;
  }

  registerOnChange(fn) {
    this.emitChange = fn;
  }

  registerOnTouched(fn) {
    this.emitTouched = fn;
  }

  abstract writeValue(value: any): void;

  ngOnInit() {
    if (!this._elementRef.nativeElement.hasAttribute('ecpCoreControlLayout')) {
      throw new Error('"ControlLayoutDirective" is required');
    }
  }
}
