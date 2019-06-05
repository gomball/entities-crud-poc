import { Provider } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../_test-stubs/core-injectables.providers';
import { NgxTranslateStubModule } from '../../_test-stubs/ngx-translate.module';
import { SelectComponent } from '../controls/components/select/select.component';
import { GridStateService } from './grid-state.service';
import { GridComponent } from './grid.component';
import { GridService } from './grid.service';

class GridStubService {
  ready$: Observable<boolean> = new BehaviorSubject(true).asObservable();
}
const GRID_STUB_SERVICE_PROVIDER: Provider = {
  provide: GridService,
  useValue: new GridStubService()
};

class GridStateStubService {
  getStates = (): any => {};
}
const GRID_STATE_STUB_SERVICE_PROVIDER: Provider = {
  provide: GridStateService,
  useValue: new GridStateStubService()
};

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, AgGridModule.withComponents([]), NgbTooltipModule, NgxTranslateStubModule],
      declarations: [GridComponent, SelectComponent],
      providers: [CROSS_CUTTING_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(GridService, GRID_STUB_SERVICE_PROVIDER);
    TestBed.overrideProvider(GridStateService, GRID_STATE_STUB_SERVICE_PROVIDER);
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
