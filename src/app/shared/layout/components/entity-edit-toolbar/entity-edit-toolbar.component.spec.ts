import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CORE_CONFIG_STUB_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { NgxTranslateStubModule } from '../../../../_test-stubs/ngx-translate.module';
import { EntityEditToolbarComponent } from './entity-edit-toolbar.component';

describe('EntityEditToolbarComponent', () => {
  let component: EntityEditToolbarComponent;
  let fixture: ComponentFixture<EntityEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NgxTranslateStubModule],
      declarations: [EntityEditToolbarComponent],
      providers: [CORE_CONFIG_STUB_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
