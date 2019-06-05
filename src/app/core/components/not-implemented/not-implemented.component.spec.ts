import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MODAL_STUB_SERVICE_PROVIDER, NAVIGATION_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { NotImplementedComponent } from './not-implemented.component';

describe('NotImplementedComponent', () => {
  let component: NotImplementedComponent;
  let fixture: ComponentFixture<NotImplementedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotImplementedComponent],
      providers: [NAVIGATION_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotImplementedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
