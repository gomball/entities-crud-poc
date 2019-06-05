import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18N_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { NgbStubModule } from '../../../_test-stubs/ng-bootstrap.module';
import { NgxTranslateStubModule } from '../../../_test-stubs/ngx-translate.module';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbStubModule, NgxTranslateStubModule],
      declarations: [ConfirmModalComponent],
      providers: [I18N_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
