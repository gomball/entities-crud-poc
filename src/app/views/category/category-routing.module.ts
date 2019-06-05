import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CategoryListComponent } from './list/category-list.component';

const routes: Routes = [
  { path: 'list', component: CategoryListComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'edit/new',
  //   component: CategoryEditComponent,
  //   canActivate: [AuthGuard],
  //   children: [{ path: 'form', component: CategoryEditFormComponent, canActivate: [AuthGuard] }]
  // },
  // {
  //   path: 'edit/:id',
  //   component: CategoryEditComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: 'form', component: CategoryEditFormComponent, canActivate: [AuthGuard] },
  //     // { path: 'events', component: BaseEventRecordListComponent, canActivate: [AuthGuard] },
  //     { path: '', pathMatch: 'full', redirectTo: 'form' }
  //   ]
  // },
  { path: '', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
