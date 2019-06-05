import { Component, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CrossCuttingService } from '../../../../core/services/cross-cutting.service';
import { BaseControlComponent } from '../_bases/base-control.component';

@Component({
  selector: 'ecp-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseControlComponent {
  @Input()
  valueProperty: string;
  @Input()
  descriptionProperty: string;
  @Input()
  collection: any[];
  @Input()
  translateDescription = true;

  private _model: any;

  get model(): any {
    return this._model;
  }

  set model(value: any) {
    this._model = value;
    this.emitChange(value || null);
    this.emitTouched();
  }

  constructor(ngControl: NgControl, elementRef: ElementRef, private readonly _xcs: CrossCuttingService) {
    super(ngControl, elementRef);
  }

  writeValue(value: any) {
    this._model = value;
  }

  getValue(element: any): any {
    return !!this.valueProperty ? element[this.valueProperty] : element;
  }

  getDescription(element: any): string {
    const description = !!this.descriptionProperty ? element[this.descriptionProperty] : element;
    return this.translateDescription ? this._xcs.i18n.translate(description) : description;
  }
}
