import { Observable } from 'rxjs';
import { GridOptions } from '../../../grid/grid.interfaces';
import { EntityFilterSet } from '../../../../core/domain/_types/entity-filter';

export interface BaseEntityListServiceContract {
  // data
  gridOptions: GridOptions;
  serverFilters: EntityFilterSet;
  currentEntityId: string;
  entityList$: Observable<any[]>;

  // OData
  search$(): Observable<any[]>;

  // navigation
  goToEdit$(entity: any): Observable<boolean>;

  goToCreate$(): Observable<boolean>;
}
