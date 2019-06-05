import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {
  ColDef as AgColumnDefinition,
  GridApi as AgGridApi,
  GridOptions as AgGridOptions,
  GridReadyEvent as AgGridReadyEvent
} from 'ag-grid-community';
import { Subject } from 'rxjs';
import { ShowDirective } from '../../../../core/directives/show.directive';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { NgxTranslateStubModule } from '../../../../_test-stubs/ngx-translate.module';
import { InputComponent } from '../../../controls/components/input/input.component';
import { SelectComponent } from '../../../controls/components/select/select.component';
import { ControlLayoutDirective } from '../../../controls/directives/control-layout.directive';
import { NumberGridFilterComponent } from './number-grid-filter.component';

@Component({
  selector: 'ecp-stub',
  template: '<ag-grid-angular [gridOptions]="gridOptions" [rowData]="data"></ag-grid-angular>'
})
class StubComponent {
  gridReady$ = new Subject<boolean>();
  gridApi: AgGridApi;
  gridOptions: AgGridOptions = {
    columnDefs: [
      { headerName: 'id_header', field: 'id' },
      { headerName: 'test_field_header', field: 'testField', filterFramework: NumberGridFilterComponent }
    ] as AgColumnDefinition[],
    onGridReady: (event: AgGridReadyEvent): void => {
      this.gridApi = event.api;
      this.gridReady$.next(true);
    }
  };
  data = [{ id: 1, testField: 1 }, { id: 2, testField: 2 }, { id: 3, testField: 3 }];
}

describe('NumberGridFilterComponent', () => {
  let fixture: ComponentFixture<StubComponent>;
  let stub: StubComponent;
  let component: NumberGridFilterComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AgGridModule.withComponents([NumberGridFilterComponent]), FormsModule, NgxTranslateStubModule],
      declarations: [NumberGridFilterComponent, StubComponent, InputComponent, SelectComponent, ControlLayoutDirective, ShowDirective],
      providers: [CROSS_CUTTING_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StubComponent);
    stub = fixture.componentInstance;
    fixture.detectChanges();
    stub.gridReady$.subscribe(() => (component = stub.gridApi.getFilterInstance('testField').getFrameworkComponentInstance()));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
