import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTranslateStubModule } from '../../../../../_test-stubs/ngx-translate.module';
import { SlideBandButtonComponent } from './slide-band-button.component';

describe('SlideBandButtonComponent', () => {
  let component: SlideBandButtonComponent;
  let fixture: ComponentFixture<SlideBandButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTranslateStubModule],
      declarations: [SlideBandButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBandButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
