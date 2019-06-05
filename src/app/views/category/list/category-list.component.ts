import { Component, OnInit } from '@angular/core';
import { Category } from '../../../core/domain/category';
import { BaseEntityListComponent } from '../../../shared/layout/_bases/components/base-entity-list.component';
import { CategoryListService } from './category-list.service';

@Component({
  selector: 'ecp-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseEntityListComponent<Category> implements OnInit {
  constructor(entityService: CategoryListService) {
    super(entityService, {});
  }

  ngOnInit() {
    this.entityService.serverFilters = {
      condition: 'and',
      filters: [{ field: 'CategoryName', value: 'Seafood' }]
    };
  }
}
