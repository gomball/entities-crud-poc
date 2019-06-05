import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbStubModule } from '../../../_test-stubs/ng-bootstrap.module';
import { NgxTranslateStubModule } from '../../../_test-stubs/ngx-translate.module';
import { ErrorModalComponent } from './error-modal.component';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbStubModule, NgxTranslateStubModule],
      declarations: [ErrorModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
