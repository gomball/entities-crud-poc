import { Component, Provider, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderModule } from 'angular2-query-builder';
import { Observable, of } from 'rxjs';
import { ShowDirective } from '../../../core/directives/show.directive';
import { NgbStubModule, NgxTranslateStubModule, SharedControlStubModule } from '../../../_test-stubs/_index';
import { QueryFilterBuilderStateService } from './query-filter-builder-state.service';
import { QueryFilterBuilderComponent } from './query-filter-builder.component';
import { QueryFilterBuilderService } from './query-filter-builder.service';

@Component({
  selector: 'ecp-stub',
  template: `
  <form [formGroup]="testForm">
  <ecp-query-filter-builder entityName="vehicle" formControlName="testControl"></ecp-query-filter-builder>
  <form>`
})
class StubComponent {
  @ViewChild(QueryFilterBuilderComponent)
  control: QueryFilterBuilderComponent;
  testForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({ testControl: [null] });
  }
}

class QueryFilterBuilderStubService {
  getInitialFilterConfig = (): any => {};
}
const QUERY_FILTER_BUILDER_STUB_SERVICE_PROVIDER: Provider = {
  provide: QueryFilterBuilderService,
  useValue: new QueryFilterBuilderStubService()
};

class QueryFilterBuilderStateStubService {
  getStates = (): any => {};
  saveState$ = (name: string, queryFilterBuilder: QueryFilterBuilderComponent): Observable<string> => of('');
  applyState = (name: string, queryFilterBuilder: QueryFilterBuilderComponent): void => {};
  removeState = (name: string, queryFilterBuilder: QueryFilterBuilderComponent): void => {};
}
const QUERY_FILTER_BUILDER_STATE_STUB_SERVICE_PROVIDER: Provider = {
  provide: QueryFilterBuilderStateService,
  useValue: new QueryFilterBuilderStateStubService()
};

describe('QueryFilterBuilderComponent', () => {
  let fixture: ComponentFixture<StubComponent>;
  let stub: StubComponent;
  let control: QueryFilterBuilderComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, QueryBuilderModule, NgxTranslateStubModule, NgbStubModule, SharedControlStubModule],
      declarations: [QueryFilterBuilderComponent, StubComponent, ShowDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(QueryFilterBuilderService, QUERY_FILTER_BUILDER_STUB_SERVICE_PROVIDER);
    TestBed.overrideProvider(QueryFilterBuilderStateService, QUERY_FILTER_BUILDER_STATE_STUB_SERVICE_PROVIDER);
    fixture = TestBed.createComponent(StubComponent);
    stub = fixture.componentInstance;
    // fixture.detectChanges();
    control = stub.control;
    control.entityName = 'vehicle';
  });

  it('should create stub', () => {
    expect(stub).toBeTruthy();
  });

  it('should create form control', () => {
    expect(control).toBeTruthy();
  });
});
