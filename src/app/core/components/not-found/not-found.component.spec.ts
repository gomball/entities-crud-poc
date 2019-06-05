import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MODAL_STUB_SERVICE_PROVIDER, NAVIGATION_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/core-injectables.providers';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      providers: [NAVIGATION_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
