import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CrossCuttingService } from '../../../core/services/cross-cutting.service';
import { StorageKeys } from '../../../core/services/storage.service';
import { QueryFilterBuilderComponent } from './query-filter-builder.component';

@Injectable()
export class QueryFilterBuilderStateService {
  private get _currentStates(): any {
    return this._xcs.storage.getLocalObject<any>(StorageKeys.QUERY_FILTER_STATES);
  }

  constructor(private readonly _xcs: CrossCuttingService) {}

  getStates(): string[] {
    return [
      '',
      ..._.chain(this._currentStates)
        .get(this._xcs.routeBasedId)
        .keys()
        .value()
    ];
  }

  saveState$(name: string, queryFilterBuilder: QueryFilterBuilderComponent): Observable<string> {
    return this._xcs.modal.prompt$<string>('messages.askForFilterStateName', null, null, { value: name }).pipe(
      filter((promptRetVal) => promptRetVal.accepted && !!promptRetVal.value),
      map((promptRetVal) => promptRetVal.value),
      tap((newName) => {
        const model = queryFilterBuilder.query;
        const currentStates = this._currentStates || {};
        _.set(currentStates, `${this._xcs.routeBasedId}.${newName}`, model);
        this._xcs.storage.setLocalObject(StorageKeys.QUERY_FILTER_STATES, currentStates);
      })
    );
  }

  applyState(name: string, queryFilterBuilder: QueryFilterBuilderComponent): void {
    queryFilterBuilder.query = !!name ? this._currentStates[this._xcs.routeBasedId][name] : null;
  }

  removeState(name: string, queryFilterBuilder: QueryFilterBuilderComponent): void {
    let currentStates = this._currentStates;
    currentStates = _.omit(currentStates, `${this._xcs.routeBasedId}.${name}`);
    this._xcs.storage.setLocalObject(StorageKeys.QUERY_FILTER_STATES, currentStates);
    this.applyState(null, queryFilterBuilder);
  }
}
