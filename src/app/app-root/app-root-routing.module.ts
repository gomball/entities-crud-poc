import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { NotImplementedComponent } from '../core/components/not-implemented/not-implemented.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from '../views/login/login.component';
import { MenuComponent } from '../views/menu/menu.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'category', loadChildren: '../views/category/category.module#CategoryModule' },
  {
    path: 'product',
    children: [{ path: '**', pathMatch: 'full', component: NotImplementedComponent }]
  },
  { path: '', pathMatch: 'full', redirectTo: '/menu' },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRootRoutingModule {}
