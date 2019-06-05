import { Component } from '@angular/core';
import { IDoesFilterPassParams } from 'ag-grid-community';
import * as _ from 'lodash';
import { BaseGridFilterComponent } from '../_bases/base-grid-filter.component';

@Component({
  selector: 'ecp-text-grid-filter',
  templateUrl: './text-grid-filter.component.html',
  styleUrls: ['../_bases/base-grid-filter.component.scss', './text-grid-filter.component.scss']
})
export class TextGridFilterComponent extends BaseGridFilterComponent<string> {
  operators: string[] = ['eq', 'neq', 'contains', 'startswith', 'endswith'];

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const rowValue = this._normalize(this.valueGetter(params.node));
    const filterValue = this._normalize(this.model.value);
    switch (this.model.operator) {
      case 'eq':
        return rowValue === filterValue;
      case 'neq':
        return rowValue !== filterValue;
      case 'contains':
        return rowValue.includes(filterValue);
      // case 'notcontains':
      //   return !rowValue.includes(filterValue);
      case 'startswith':
        return rowValue.startsWith(filterValue);
      case 'endswith':
        return rowValue.endsWith(filterValue);
    }
  }

  private _normalize(value: any): string {
    return _.toLower(_.toString(value));
  }
}
