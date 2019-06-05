import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbStubModule } from '../../../../../_test-stubs/ng-bootstrap.module';
import { NgxTranslateStubModule } from '../../../../../_test-stubs/ngx-translate.module';
import { EasedInputInfoModalComponent } from './eased-input-info.component';

describe('EasedInputInfoModalComponent', () => {
  let component: EasedInputInfoModalComponent;
  let fixture: ComponentFixture<EasedInputInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbStubModule, NgxTranslateStubModule],
      declarations: [EasedInputInfoModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasedInputInfoModalComponent);
    component = fixture.componentInstance;
    component.element = { code: 'testCode', name: 'testName' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
