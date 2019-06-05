import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { CoreDeclarablesModule } from '../../core/core-declarables.module';

@NgModule({
  imports: [ReactiveFormsModule, LoginRoutingModule, CoreDeclarablesModule],
  declarations: [LoginComponent],
  exports: [],
  providers: [LoginService]
})
export class LoginModule {}
