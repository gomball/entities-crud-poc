import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NgxTranslateStubModule } from '../../../../_test-stubs/ngx-translate.module';
import { SlideBandComponent } from './slide-band.component';
import { SlideBandService } from './slide-band.service';

class SlideBandStubService {
  hideAll$ = new BehaviorSubject<void>(null);
}
const SLIDE_BAND_STUB_SERVICE_PROVIDER: Provider = {
  provide: SlideBandService,
  useClass: SlideBandStubService
};

describe('SlideBandComponent', () => {
  let component: SlideBandComponent;
  let fixture: ComponentFixture<SlideBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTranslateStubModule],
      declarations: [SlideBandComponent],
      providers: [SLIDE_BAND_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
