import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { AuthGuard } from '../../core/guards/auth.guard';

export const ROUTES: Route[] = [{ path: '', component: MenuComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
