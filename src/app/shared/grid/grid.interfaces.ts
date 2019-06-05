import { ColumnApi as AgColumnApi, GridApi as AgGridApi } from 'ag-grid-community';

export type GridColumnType = 'string' | 'number' | 'date' | 'time' | 'datetime';
export type GridFilterType = GridColumnType | 'select';

export interface GridColumn {
  titleKey: string;
  field: string;
  type: GridColumnType;
  filter?: GridFilterType;
  format?: string;
  width?: number | 'auto';
  minWidth?: number;
  groupable?: boolean;
  pivotable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  movable?: boolean;
  getter?: (param: any) => any;
  odataType?: 'navigable' | 'notNavigable' | 'none';
}

export interface GridOptions {
  columns: GridColumn[];
  extraProperties?: string[];
  onRowClick?: 'navigateChild' | 'select' | 'multiselect' | Function;
  onRowDoubleClick?: 'navigateChild' | 'edit' | Function;
}

export class GridWidget {
  gridId: string;
  coreApi: AgGridApi;
  columnApi: AgColumnApi;
}
