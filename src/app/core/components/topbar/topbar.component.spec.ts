import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CORE_CONFIG_STUB_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { TopbarComponent } from './topbar.component';
import { TopbarService } from './topbar.service';
import { Observable, of } from 'rxjs';

class TopbarStubService {
  isTopbarVisible$: Observable<boolean> = of(true);
}
const TOPBAR_STUB_SERVICE_PROVIDER: Provider = {
  provide: TopbarService,
  useValue: new TopbarStubService()
};

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      providers: [CORE_CONFIG_STUB_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(TopbarService, TOPBAR_STUB_SERVICE_PROVIDER);
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
