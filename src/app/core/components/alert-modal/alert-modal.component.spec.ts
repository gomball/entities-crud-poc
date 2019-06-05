import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18N_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { NgbStubModule } from '../../../_test-stubs/ng-bootstrap.module';
import { NgxTranslateStubModule } from '../../../_test-stubs/ngx-translate.module';
import { AlertModalComponent } from './alert-modal.component';

describe('AlertModalComponent', () => {
  let component: AlertModalComponent;
  let fixture: ComponentFixture<AlertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbStubModule, NgxTranslateStubModule],
      declarations: [AlertModalComponent],
      providers: [I18N_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
