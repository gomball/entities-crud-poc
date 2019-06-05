import { Component } from '@angular/core';
import { IDoesFilterPassParams } from 'ag-grid-community';
import { BaseGridFilterComponent } from '../_bases/base-grid-filter.component';

@Component({
  selector: 'ecp-date-grid-filter',
  templateUrl: './date-grid-filter.component.html',
  styleUrls: ['../_bases/base-grid-filter.component.scss', './date-grid-filter.component.scss']
})
export class DateGridFilterComponent extends BaseGridFilterComponent<Date> {
  operators: string[] = ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'inrange'];

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const rowValue = (<Date>this.valueGetter(params.node)).clone().clearTime();
    const filterValue = this.model.value;
    switch (this.model.operator) {
      case 'eq':
        return rowValue.equals(filterValue);
      case 'neq':
        return !rowValue.equals(filterValue);
      case 'lt':
        return rowValue.isBefore(filterValue);
      case 'lte':
        return !rowValue.isAfter(filterValue);
      case 'gt':
        return rowValue.isAfter(filterValue);
      case 'gte':
        return !rowValue.isBefore(filterValue);
      case 'inrange':
        const filterValue2 = this.model.value2 || filterValue;
        return !rowValue.isBefore(filterValue) && !rowValue.isAfter(filterValue2);
    }
  }
}
