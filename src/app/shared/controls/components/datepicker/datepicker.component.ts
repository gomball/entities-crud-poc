import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BaseControlComponent } from '../_bases/base-control.component';

@Component({
  selector: 'ecp-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent extends BaseControlComponent implements OnInit {
  private _model: NgbDateStruct;
  @Input()
  endOfDay = false;

  get model(): NgbDateStruct {
    return this._model;
  }

  set model(value: NgbDateStruct) {
    this._model = value;
    this.emitChange(!!value ? this._arrangeTime(new Date(value.year, value.month - 1, value.day, 0, 0, 0, 0)) : null);
    this.emitTouched();
  }

  constructor(ngControl: NgControl, elemetRef: ElementRef) {
    super(ngControl, elemetRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // this.model = this._model;
  }

  writeValue(date: Date) {
    this._model = date ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
  }

  private _arrangeTime(date: Date): Date {
    return !!date ? date.clone().addSeconds(!this.endOfDay ? 0 : 24 * 60 * 60 - 1) : null;
  }
}
