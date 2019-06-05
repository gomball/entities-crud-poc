import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { I18N_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { NgbStubModule } from '../../../_test-stubs/ng-bootstrap.module';
import { NgxTranslateStubModule } from '../../../_test-stubs/ngx-translate.module';
import { PromptModalComponent } from './prompt-modal.component';

describe('PromptModalComponent', () => {
  let component: PromptModalComponent<any>;
  let fixture: ComponentFixture<PromptModalComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbStubModule, NgxTranslateStubModule],
      declarations: [PromptModalComponent],
      providers: [I18N_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
