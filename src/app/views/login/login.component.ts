import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { CrossCuttingService } from '../../core/services/cross-cutting.service';
import { FormService } from '../../core/services/form.service';
import { LoginService } from './login.service';

const LOCAL_ENV_LOGIN_FORM_DATA: any = {
  tenantName: 'GB',
  userName: 'gomball',
  password: null
};

@Component({
  selector: 'ecp-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private readonly _loginService: LoginService, private readonly _xcs: CrossCuttingService) {}

  ngOnInit(): void {
    if (environment.production) {
      this.loginForm = FormService.initialize(LOCAL_ENV_LOGIN_FORM_DATA);
    } else {
      this.loginForm = FormService.initialize(['tenantName', 'userName', 'password']);
    }
    Object.keys(this.loginForm.getRawValue()).forEach((controlName) =>
      this.loginForm.controls[controlName].setValidators(FormService.getRequiredValidator())
    );
  }

  login(): void {
    const { tenantName, userName, password } = this.loginForm.getRawValue();
    this._loginService.login$(tenantName, userName, password).subscribe();
  }
}
