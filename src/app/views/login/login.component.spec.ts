import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { NgxTranslateStubModule } from '../../_test-stubs/ngx-translate.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { Provider } from '@angular/core';

class LoginStubService {}
const LOGIN_STUB_SERVICE_PROVIDER: Provider = {
  provide: LoginService,
  useClass: LoginStubService
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, NgxTranslateStubModule],
      declarations: [LoginComponent],
      providers: [CROSS_CUTTING_STUB_SERVICE_PROVIDER, LOGIN_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


