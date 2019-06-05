import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { CORE_CONFIG_STUB_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { NgxTranslateStubModule } from '../../../../_test-stubs/ngx-translate.module';
import { BaseEntityEditService } from '../../_bases/services/base-entity-edit.service';
import { BaseEntityEditServiceContract } from '../../_bases/services/base-entity-edit.service-contract';
import { EntityEditSidebarComponent } from './entity-edit-sidebar.component';
import { EntityEditSidebarTab } from './entity-edit-sidebar.interfaces';
import { EntityEditSidebarTabComponent } from './tab/entity-edit-sidebar-tab.component';

class EntityEditStubService implements BaseEntityEditServiceContract {
  isCreateOperation: boolean;
  form: FormGroup = new FormBuilder().group({ testControl: [null] });
  resetForm = (): void => {};
  loadForEdit$ = (id: string): Observable<any> => of({});
  get$ = (id: string): Observable<any> => of({});
  save$ = (): Observable<string> => of('');
  delete$ = (): Observable<null> => of(null);
  goToList$ = (): Observable<boolean> => of(true);
  goToTab$ = (tab: EntityEditSidebarTab): Observable<boolean> => of(true);
}
const ENTITY_EDIT_STUB_SERVICE_PROVIDER: Provider = {
  provide: BaseEntityEditService,
  useClass: EntityEditStubService
};

describe('EntityEditSidebarComponent', () => {
  let component: EntityEditSidebarComponent;
  let fixture: ComponentFixture<EntityEditSidebarComponent>;
  let entityEditStubService: EntityEditStubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NgxTranslateStubModule],
      declarations: [EntityEditSidebarComponent, EntityEditSidebarTabComponent],
      providers: [CORE_CONFIG_STUB_PROVIDER, ENTITY_EDIT_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditSidebarComponent);
    component = fixture.componentInstance;
    entityEditStubService = TestBed.get(BaseEntityEditService);

    component.entityService = entityEditStubService;
    component.sideBarDefinition = { tabs: [{ id: null, initialsKey: 'TST', titleKey: 'test' }]};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
