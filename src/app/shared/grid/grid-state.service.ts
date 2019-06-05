import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CrossCuttingService } from '../../core/services/cross-cutting.service';
import { StorageKeys } from '../../core/services/storage.service';
import { GridWidget } from './grid.interfaces';

@Injectable()
export class GridStateService {
  private get _currentStates(): any {
    return this._xcs.storage.getLocalObject<any>(StorageKeys.GRID_STATES);
  }

  constructor(private readonly _xcs: CrossCuttingService) {}

  getStates(widget: GridWidget): string[] {
    return [
      '',
      ..._.chain(this._currentStates)
        .get(widget.gridId)
        .keys()
        .value()
    ];
  }

  saveState$(name: string, widget: GridWidget): Observable<string> {
    return this._xcs.modal.prompt$<string>('messages.askForGridStateName', null, null, { value: name }).pipe(
      filter((promptRetVal) => promptRetVal.accepted && !!promptRetVal.value),
      map((promptRetVal) => promptRetVal.value),
      tap((newName) => {
        const filterModel = widget.coreApi.getFilterModel();
        const sortModel = widget.coreApi.getSortModel();
        const miscModel = widget.columnApi.getColumnState();
        const currentStates = this._currentStates || {};
        _.set(currentStates, `${widget.gridId}.${newName}`, { filterModel, sortModel, miscModel });
        this._xcs.storage.setLocalObject(StorageKeys.GRID_STATES, currentStates);
      })
    );
  }

  applyState(name: string, widget: GridWidget): void {
    if (!!name) {
      const currentStates = this._currentStates;
      widget.coreApi.setFilterModel(currentStates[widget.gridId][name].filterModel);
      widget.coreApi.setSortModel(currentStates[widget.gridId][name].sortModel);
      widget.columnApi.setColumnState(currentStates[widget.gridId][name].miscModel);
    } else {
      widget.coreApi.setFilterModel({});
      widget.coreApi.setSortModel([]);
      widget.columnApi.resetColumnState();
    }
  }

  removeState(name: string, widget: GridWidget): void {
    let currentStates = this._currentStates;
    currentStates = _.omit(currentStates, `${widget.gridId}.${name}`);
    this._xcs.storage.setLocalObject(StorageKeys.GRID_STATES, currentStates);
    this.applyState(null, widget);
  }
}
