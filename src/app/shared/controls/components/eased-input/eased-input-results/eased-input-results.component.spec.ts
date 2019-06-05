import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbStubModule } from '../../../../../_test-stubs/ng-bootstrap.module';
import { NgxTranslateStubModule } from '../../../../../_test-stubs/ngx-translate.module';
import { EasedInputResultsModalComponent } from './eased-input-results.component';

describe('EasedInputResultsModalComponent', () => {
  let component: EasedInputResultsModalComponent;
  let fixture: ComponentFixture<EasedInputResultsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbStubModule, NgxTranslateStubModule],
      declarations: [EasedInputResultsModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EasedInputResultsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
