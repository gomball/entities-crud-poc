import { Injectable } from '@angular/core';
import { Category } from '../../../core/domain/category';
import { EntityFilterSet } from '../../../core/domain/_types/entity-filter';
import { CrossCuttingService } from '../../../core/services/cross-cutting.service';
import { GridOptions } from '../../../shared/grid/grid.interfaces';
import { BaseEntityListService } from '../../../shared/layout/_bases/services/base-entity-list.service';

@Injectable()
export class CategoryListService extends BaseEntityListService<Category> {
  serverFilters: EntityFilterSet;
  gridOptions: GridOptions;

  constructor(xcs: CrossCuttingService) {
    super(Category, xcs);

    this.gridOptions = {
      // onRowClick: this.goToEdit$.bind(this),
      columns: [
        { field: 'CategoryID', titleKey: 'id', type: 'number', width: 100, movable: false, filterable: false },
        { field: 'CategoryName', titleKey: 'name', type: 'string', width: 200 },
        { field: 'Description', titleKey: 'description', type: 'string', width: 'auto', groupable: true }
      ]
    };
  }
}
