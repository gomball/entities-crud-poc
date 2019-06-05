import { AgFilterComponent } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';

import { GridFilterModel } from '../models';

export abstract class BaseGridFilterComponent<T> implements AgFilterComponent {
  private params: IFilterParams;
  protected valueGetter: (rowNode: RowNode) => any;
  model: GridFilterModel<T> = { value: null, operator: 'eq' };
  abstract operators: string[];

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return !!this.model.value;
  }

  abstract doesFilterPass(params: IDoesFilterPassParams): boolean;

  getModel(): GridFilterModel<T> {
    return this.model;
  }

  setModel(model: GridFilterModel<T>): void {
    this.model.value = model ? model.value : null;
    this.model.value2 = model ? model.value2 : null;
    this.model.operator = model ? model.operator : 'eq';
  }

  setValue(value: T): void {
    if (this.model.value === value) {
      return;
    }
    this.model.value = value;
    this.params.filterChangedCallback();
  }

  setValue2(value: T): void {
    if (this.model.value2 === value) {
      return;
    }
    this.model.value2 = value;
    this.params.filterChangedCallback();
  }

  setOperator(value: string): void {
    if (this.model.operator === value) {
      return;
    }
    this.model.operator = value;
    this.params.filterChangedCallback();
  }
}
