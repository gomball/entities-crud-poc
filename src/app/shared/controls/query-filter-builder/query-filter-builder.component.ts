import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { QueryBuilderConfig, RuleSet } from 'angular2-query-builder';
import { EntityFilterSet } from '../../../core/domain/_types/entity-filter';
import { QueryFilterBuilderStateService } from './query-filter-builder-state.service';
import { QueryFilterBuilderService, QUERY_BUILDER_STYLE_OPTIONS } from './query-filter-builder.service';

@Component({
  selector: 'ecp-query-filter-builder',
  templateUrl: './query-filter-builder.component.html',
  styleUrls: ['./query-filter-builder.component.scss'],
  providers: [QueryFilterBuilderService, QueryFilterBuilderStateService]
})
export class QueryFilterBuilderComponent implements OnInit, ControlValueAccessor {
  @Input()
  entityName: string;

  private _isModelFromQueryBuilderArranged = false;

  config: QueryBuilderConfig;
  readonly classNames = QUERY_BUILDER_STYLE_OPTIONS;
  private _query: RuleSet;
  get query(): RuleSet {
    return this._query;
  }
  set query(value: RuleSet) {
    if (!this._isModelFromQueryBuilderArranged && !!value && !value.rules.length) {
      this._isModelFromQueryBuilderArranged = true;
      return;
    }
    this._query = value;
    if (!!this.emitChange) {
      this.emitChange(!!this._query ? this._queryFiltersBuilderService.getEntityFilterFromQuery(this._query) : null);
    }
    if (!!this.emitTouched) {
      this.emitTouched();
    }
  }

  filterStateNames: string[];
  filterStateName: string;
  visible = false;
  get summary(): string {
    return !!this.query && !!this.query.rules.length ? this._queryFiltersBuilderService.getSummary(this._ngControl.value) : '··········';
  }

  constructor(
    private readonly _ngControl: NgControl,
    private readonly _queryFiltersBuilderService: QueryFilterBuilderService,
    private readonly _queryFiltersBuilderStateService: QueryFilterBuilderStateService
  ) {
    this._ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.config = this._queryFiltersBuilderService.getInitialFilterConfig(this.entityName);
    this.filterStateNames = this._queryFiltersBuilderStateService.getStates();
  }

  saveState(): void {
    this._queryFiltersBuilderStateService.saveState$(this.filterStateName, this).subscribe((newStateName) => {
      this.filterStateNames = this._queryFiltersBuilderStateService.getStates();
      this.filterStateName = newStateName;
      this.applyState();
    });
  }

  applyState(filterStateName?: string): void {
    this._queryFiltersBuilderStateService.applyState(this.filterStateName, this);
  }

  removeState(filterStateName?: string): void {
    this._queryFiltersBuilderStateService.removeState(this.filterStateName, this);
    this.filterStateNames = this._queryFiltersBuilderStateService.getStates();
    this.filterStateName = '';
    this.applyState();
  }

  // control value accesor implementation

  emitChange: any;
  emitTouched: any;

  registerOnChange(fn) {
    this.emitChange = fn;
  }

  registerOnTouched(fn) {
    this.emitTouched = fn;
  }

  writeValue(value: EntityFilterSet): void {
    this.query = value ? this._queryFiltersBuilderService.getQueryFromEntityFilter(value) : null;
  }
}
