import { Injectable, Type } from '@angular/core';
import {
  ColDef as AgColumnDefinition,
  GridOptions as AgGridOptions,
  GridReadyEvent as AgGridReadyEvent,
  RowClickedEvent as AgRowClickedEvent,
  SideBarDef as AgSideBarDef,
  ToolPanelDef as AgToolPanelDef
} from 'ag-grid-community';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CrossCuttingService } from '../../core/services/cross-cutting.service';
import { DateGridFilterComponent } from './grid-filters/date-grid-filter/date-grid-filter.component';
import { NumberGridFilterComponent } from './grid-filters/number-grid-filter/number-grid-filter.component';
import { TextGridFilterComponent } from './grid-filters/text-grid-filter/text-grid-filter.component';
import { GridColumn, GridOptions, GridWidget } from './grid.interfaces';

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy';
const DEFAULT_TIME_FORMAT = 'HH:mm';
const DEFAULT_DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
const DEFAULT_NUMBER_FORMAT = '0g'; // 0 dec places, ['g' | ''] => grouped or not

const DEFAULT_COLUMN_TYPES: any = {};
const DEFAULT_COLUMN_DEFINITION: any = {};

@Injectable()
export class GridService {
  private _readySubj = new Subject<GridWidget>();
  ready$: Observable<GridWidget>;

  constructor(private readonly _xcs: CrossCuttingService) {
    this.ready$ = this._readySubj.asObservable().pipe(filter((w: any) => !!w));
  }

  static getODataProperties(options: GridOptions): string[] {
    const retVal: string[] = [];
    options.columns.forEach((c) => {
      let prop: string;
      if (!c || c.odataType === 'none') {
        return true;
      } else if (c.odataType === 'notNavigable') {
        prop = c.field.substring(0, c.field.lastIndexOf('.')) || c.field;
      } else if (!c.odataType || c.odataType === 'navigable') {
        prop = c.field;
      }
      if (!!prop && retVal.indexOf(prop) < 0) {
        retVal.push(prop);
      }
    });
    if (!!options.extraProperties) {
      retVal.push(...options.extraProperties);
    }
    return retVal;
  }

  getGridOptions(options: GridOptions, gridId: string): AgGridOptions {
    const go: AgGridOptions = {};
    go.defaultColDef = DEFAULT_COLUMN_DEFINITION;
    go.columnTypes = DEFAULT_COLUMN_TYPES;
    go.rowHeight = 22;
    go.showToolPanel = false;
    go.sideBar = this._getSideBar(options);

    go.columnDefs = this._getGridColumns(options.columns);
    go.rowGroupPanelShow = _.some(options.columns, 'groupable') ? 'always' : null;
    go.groupMultiAutoColumn = !!go.rowGroupPanelShow;
    go.enableFilter = _.some(options.columns, (c: GridColumn) => c.filterable !== false);
    go.enableSorting = _.some(options.columns, (c: GridColumn) => c.sortable !== false);
    go.enableColResize = _.some(options.columns, (c: GridColumn) => c.resizable !== false);
    go.suppressMovableColumns = !_.some(options.columns, (c: GridColumn) => c.movable !== false);

    go.animateRows = false;
    go.suppressColumnMoveAnimation = true;
    go.suppressCellSelection = true;
    if (!options.onRowClick || options.onRowClick === 'select' || options.onRowClick === 'multiselect') {
      go.suppressRowClickSelection = false;
    } else if (options.onRowClick instanceof Function) {
      go.suppressRowClickSelection = true;
      go.onRowClicked = GridService._rowClicked.bind(GridService, options.onRowClick);
    }
    // go.enableStatusBar = true;
    // go.alwaysShowStatusBar = true;

    go.onGridReady = this._gridReady.bind(this, gridId);
    return go;
  }

  private _getGridColumns(columns: GridColumn[]): AgColumnDefinition[] {
    return columns.map((c) => {
      const co: AgColumnDefinition = {};
      co.menuTabs = ['filterMenuTab', 'columnsMenuTab'];

      co.headerName = this._xcs.i18n.translate(c.titleKey);
      co.field = c.field;
      co.colId = !!c.getter ? null : c.field;
      co.filter = GridService._getFilterProp(c);
      co.filterFramework = GridService._getFilterFrameworkProp(c);
      co.width = _.isNumber(c.width) ? +c.width : null;
      co.minWidth = c.minWidth || co.width || 20;
      co.enableRowGroup = c.groupable || false;
      co.enablePivot = c.pivotable || false;
      co.suppressFilter = c.filterable === false;
      co.suppressSorting = c.sortable === false;
      co.suppressResize = c.resizable === false;
      co.suppressMovable = c.movable === false;
      co.suppressSizeToFit = c.width !== 'auto';
      co.valueGetter = c.getter ? c.getter : null;
      co.valueFormatter = GridService._getFormatterProp(c);

      co.headerClass = c.type === 'number' ? 'text-right' : null;
      co.cellClass = c.type === 'number' ? 'text-right' : null;
      return co;
    });
  }

  private _getSideBar(options: GridOptions): AgSideBarDef {
    const toolPanels: AgToolPanelDef[] = [
      {
        id: 'columns',
        labelDefault: this._xcs.i18n.translate('columns'),
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressSideButtons: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true
        }
      },
      {
        id: 'filters',
        labelDefault: this._xcs.i18n.translate('filters'),
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressSideButtons: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true
        }
      }
    ];
    if (options.columns.some((c) => c.pivotable)) {
      toolPanels.push({
        id: 'pivots',
        labelDefault: this._xcs.i18n.translate('pivots'),
        labelKey: 'pivots',
        iconKey: 'pivots',
        toolPanel: 'agPivotsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: false,
          suppressPivotMode: false,
          suppressSideButtons: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true
        }
      });
    }
    return { toolPanels, defaultToolPanel: 'columns' } as AgSideBarDef;
  }

  private _gridReady(gridId: string, event: AgGridReadyEvent): void {
    const coreApi = event.api;
    const columnApi = event.columnApi;
    coreApi.closeToolPanel();
    coreApi.sizeColumnsToFit();
    this._readySubj.next({ gridId, coreApi, columnApi });
  }

  private static _rowClicked(callback: Function, event: AgRowClickedEvent) {
    return callback(event.data);
  }

  private static _getFilterProp(c: GridColumn): string {
    switch (c.filter || c.type) {
      case 'select':
        return 'set';
      case 'string':
      case 'number':
      case 'date':
      case 'time':
      case 'datetime':
        return null;
    }
  }

  private static _getFilterFrameworkProp(c: GridColumn): Type<any> {
    switch (c.filter || c.type) {
      case 'string':
        return TextGridFilterComponent;
      case 'number':
        return NumberGridFilterComponent;
      case 'date':
      case 'time':
      case 'datetime':
        return DateGridFilterComponent;
    }
  }

  private static _getFormatterProp(c: GridColumn): (p: any) => any {
    switch (c.type) {
      case 'string': {
        return null;
      }
      case 'number': {
        const format = c.format || DEFAULT_NUMBER_FORMAT;
        const decimalPlaces = +format.replace(/[a-zA-Z]/gi, '') || 0;
        const useGrouping = format.replace(/\d/gi, '').toLowerCase() === 'g';
        return (p: any) => (p.value ? (+p.value).format(decimalPlaces, useGrouping /*, LOCALE_NUMBER_DECIMAL_SEPARATOR*/) : null);
      }
      case 'date': {
        const format = c.format || DEFAULT_DATE_FORMAT;
        return (p: any) => (p.value ? (<Date>p.value).toString(format) : null);
      }
      case 'time': {
        const format = c.format || DEFAULT_TIME_FORMAT;
        return (p: any) => (p.value ? (<Date>p.value).toString(format) : null);
      }
      case 'datetime': {
        const format = c.format || DEFAULT_DATETIME_FORMAT;
        return (p: any) => (p.value ? (<Date>p.value).toString(format) : null);
      }
    }
  }
}
