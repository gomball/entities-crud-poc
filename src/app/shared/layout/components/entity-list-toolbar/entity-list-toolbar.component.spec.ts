import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ShowDirective } from '../../../../core/directives/show.directive';
import { EntityFilterSet } from '../../../../core/domain/_types/entity-filter';
import { CORE_CONFIG_STUB_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { GridOptions } from '../../../grid/grid.interfaces';
import { BaseEntityListService } from '../../_bases/services/base-entity-list.service';
import { BaseEntityListServiceContract } from '../../_bases/services/base-entity-list.service-contract';
import { EntityListToolbarComponent } from './entity-list-toolbar.component';

class EntityListStubService implements BaseEntityListServiceContract {
  gridOptions: GridOptions;
  serverFilters: EntityFilterSet;
  currentEntityId: string;
  entityList$: Observable<any[]>;
  search$ = (): Observable<any[]> => of([]);
  goToEdit$ = (entity: any): Observable<boolean> => of(true);
  goToCreate$ = (): Observable<boolean> => of(true);
}
const ENTITY_LIST_STUB_SERVICE_PROVIDER: Provider = {
  provide: BaseEntityListService,
  useClass: EntityListStubService
};

describe('EntityListToolbarComponent', () => {
  let component: EntityListToolbarComponent;
  let fixture: ComponentFixture<EntityListToolbarComponent>;
  let entityListStubService: EntityListStubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityListToolbarComponent, ShowDirective],
      providers: [CORE_CONFIG_STUB_PROVIDER, ENTITY_LIST_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityListToolbarComponent);
    component = fixture.componentInstance;
    entityListStubService = TestBed.get(BaseEntityListService);

    component.entityService = entityListStubService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
