import { Component } from '@angular/core';
import { IDoesFilterPassParams } from 'ag-grid-community';
import * as _ from 'lodash';
import { GridFilterModel } from '../models';
import { BaseGridFilterComponent } from '../_bases/base-grid-filter.component';

@Component({
  selector: 'ecp-number-grid-filter',
  templateUrl: './number-grid-filter.component.html',
  styleUrls: ['../_bases/base-grid-filter.component.scss', './number-grid-filter.component.scss']
})
export class NumberGridFilterComponent extends BaseGridFilterComponent<number> {
  model: GridFilterModel<number> = { value: null, value2: null, operator: 'eq' };
  operators: string[] = ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'inrange'];

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const rowValue = this._normalize(this.valueGetter(params.node));
    const filterValue = this._normalize(this.model.value);
    switch (this.model.operator) {
      case 'eq':
        return rowValue === filterValue;
      case 'neq':
        return rowValue !== filterValue;
      case 'lt':
        return rowValue < filterValue;
      case 'lte':
        return rowValue <= filterValue;
      case 'gt':
        return rowValue > filterValue;
      case 'gte':
        return rowValue >= filterValue;
      case 'inrange':
        const filterValue2 = this.model.value2 || filterValue;
        return rowValue >= filterValue && rowValue <= filterValue2;
    }
  }

  private _normalize(value: any): number {
    return _.toNumber(value);
  }
}
