import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CORE_CONFIG_STUB_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { EntityEditBodyComponent } from './entity-edit-body.component';

describe('EntityEditBodyComponent', () => {
  let component: EntityEditBodyComponent;
  let fixture: ComponentFixture<EntityEditBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityEditBodyComponent],
      providers: [CORE_CONFIG_STUB_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
