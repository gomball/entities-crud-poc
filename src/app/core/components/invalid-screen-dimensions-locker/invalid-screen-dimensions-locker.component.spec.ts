import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreStubModule } from '../../../_test-stubs/ngrx-store.module';
import { InvalidScreenDimensionsLockerComponent } from './invalid-screen-dimensions-locker.component';
import { CORE_CONFIG_STUB_PROVIDER } from '../../../_test-stubs/core-injectables.providers';

describe('InvalidScreenDimensionsLockerComponent', () => {
  let component: InvalidScreenDimensionsLockerComponent;
  let fixture: ComponentFixture<InvalidScreenDimensionsLockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), StoreStubModule],
      declarations: [InvalidScreenDimensionsLockerComponent],
      providers: [CORE_CONFIG_STUB_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidScreenDimensionsLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
