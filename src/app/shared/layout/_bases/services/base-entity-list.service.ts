import { Type } from '@angular/core';
import { kebabCase } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Entity } from '../../../../core/domain/_types/entity';
import { EntityFilterSet } from '../../../../core/domain/_types/entity-filter';
import { CrossCuttingService } from '../../../../core/services/cross-cutting.service';
import { GUID_REGEXP } from '../../../../core/types/constants';
import { GridOptions } from '../../../grid/grid.interfaces';
import { GridService } from '../../../grid/grid.service';
import { BaseEntityListServiceContract } from './base-entity-list.service-contract';
import { BaseEntityService } from './base-entity.service';

export abstract class BaseEntityListService<T extends Entity> extends BaseEntityService<T> implements BaseEntityListServiceContract {
  private _entityList = new BehaviorSubject<T[]>(null);
  abstract gridOptions: GridOptions;
  abstract serverFilters: EntityFilterSet;

  readonly entityList$: Observable<T[]>;

  get currentEntityId(): string {
    return this.xcs.router.url.split('/').find((segment: string) => GUID_REGEXP.test(segment));
  }

  constructor(type: Type<T>, public readonly xcs: CrossCuttingService) {
    super(type);
    this.entityList$ = this._entityList.asObservable();
  }

  search$(): Observable<T[]> {
    const odataProperties = GridService.getODataProperties(this.gridOptions);
    return of(true).pipe(
      tap(() => this._entityList.next(null)),
      switchMap(() => this.xcs.http.odataQuery$(this.entityDescription.entityName, odataProperties, this.serverFilters)),
      map((rsp) => this.mapSearchResponse(rsp as T[])),
      tap((rsp) => this._entityList.next(rsp))
    );
  }

  mapSearchResponse(rsp: T[]): T[] {
    return rsp;
  }

  goToEdit$(entity: Entity): Observable<boolean> {
    return this.xcs.navigation.absoluteGoto$(
      '/' + kebabCase(this.entityDescription.entityName),
      'edit',
      entity[this.entityDescription.keyProperty]
    );
  }

  goToCreate$(): Observable<boolean> {
    return this.xcs.navigation.absoluteGoto$('/' + kebabCase(this.entityDescription.entityName), 'edit', 'new', 'form');
  }
}
