import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListModule } from './list/category-list.module';

@NgModule({
  imports: [CategoryRoutingModule, CategoryListModule]
})
export class CategoryModule {}
