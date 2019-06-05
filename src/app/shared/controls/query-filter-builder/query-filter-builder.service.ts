import { Injectable } from '@angular/core';
import { QueryBuilderClassNames, QueryBuilderConfig, Rule, RuleSet } from 'angular2-query-builder';
import { FieldMap } from 'angular2-query-builder/dist/components';
import { isDate, isString } from 'lodash';
import { DomainDescriptionService } from '../../../core/domain/services/domain-description.service';
import {
  EntityFilter,
  EntityFilterDefinition,
  EntityFilterOperator,
  EntityFilterSet,
  isEntityFilterSet
} from '../../../core/domain/_types/entity-filter';
import { I18nService } from '../../../core/services/i18n.service';
import { GUID_REGEXP } from '../../../core/types/constants';

export const QUERY_BUILDER_STYLE_OPTIONS: QueryBuilderClassNames = {
  removeIcon: 'fas fa-minus',
  addIcon: 'fas fa-plus',
  arrowIcon: 'fas fa-chevron-right px-2',
  button: 'btn btn-sm btn-outline-secondary',
  buttonGroup: 'btn-group btn-group-sm',
  rightAlign: 'order-12 ml-auto',
  switchRow: 'd-flex px-2',
  switchGroup: 'd-flex align-items-center',
  switchRadio: 'custom-control-input',
  switchLabel: 'custom-control-label',
  switchControl: 'custom-control custom-radio custom-control-inline',
  row: 'row p-2 m-1',
  rule: 'border',
  ruleSet: 'border',
  invalidRuleSet: 'alert alert-danger',
  emptyWarning: 'text-danger mx-auto',
  operatorControl: 'form-control form-control-sm',
  operatorControlSize: 'col-auto pr-0',
  fieldControl: 'form-control form-control-sm',
  fieldControlSize: 'col-auto pr-0',
  entityControl: 'form-control form-control-sm',
  entityControlSize: 'col-auto pr-0',
  inputControl: 'form-control form-control-sm',
  inputControlSize: 'col-auto'
};

@Injectable()
export class QueryFilterBuilderService {
  private _entityName: string;
  private _entityFilterDefinition: EntityFilterDefinition[];

  constructor(private readonly _i18nService: I18nService) {}

  getInitialFilterConfig(entityName: string): QueryBuilderConfig {
    this._entityName = entityName;
    const entityDescription = DomainDescriptionService.getEntityDescription(entityName);
    this._entityFilterDefinition = entityDescription.entityFilterDefinition;
    const fields: FieldMap = {};
    if (!!this._entityFilterDefinition) {
      this._entityFilterDefinition.forEach((fet) => {
        fields[fet.field] = { name: fet.field, type: fet.type, operators: fet.operators };
      });
    }
    return { fields };
  }

  getEntityFilterFromQuery(ruleSet: RuleSet): EntityFilterSet {
    const retVal: EntityFilterSet = { condition: ruleSet.condition, filters: [] as EntityFilter[] };
    ruleSet.rules.forEach((r) => {
      if (!isRuleSet(r)) {
        retVal.filters.push({
          field: r.field,
          value: r.value,
          operator: r.operator as EntityFilterOperator
        });
      } else {
        retVal.filters.push(this.getEntityFilterFromQuery(r));
      }
    });
    return retVal;
  }

  getQueryFromEntityFilter(entitityFilter: EntityFilterSet): RuleSet {
    const retVal: RuleSet = { condition: entitityFilter.condition, rules: [] };
    entitityFilter.filters.forEach((ef) => {
      if (!isEntityFilterSet(ef)) {
        const entityPropertyFilterDefinition = (this._entityFilterDefinition || []).find((fd) => fd.field === ef.field);
        if (!entityPropertyFilterDefinition) {
          throw new Error(
            `entity filter definition not found: ${this._entityName}.${ef.field}. ` +
              `please, add it to de domain description of the application`
          );
        }
        retVal.rules.push({
          field: ef.field,
          operator: ef.operator || entityPropertyFilterDefinition.operators[0] || 'eq',
          value: ef.value
        });
      } else {
        retVal.rules.push(this.getQueryFromEntityFilter(ef));
      }
    });
    return retVal;
  }

  getSummary(filter: EntityFilterSet): string {
    const filterParts: string[] = [];
    filter.filters.forEach((ef) => {
      if (!isEntityFilterSet(ef)) {
        let value = ef.value || 'empty';
        if (isString(ef.value) && GUID_REGEXP.test(ef.value)) {
          value = value.substring(0, 6) + '...';
        } else if (isDate(ef.value)) {
          value = value.toString();
        }
        filterParts.push(`${this._i18nService.translate(ef.field)} ${this._i18nService.translate(ef.operator)} ${value}`);
      } else {
        filterParts.push(`(${this.getSummary(ef)})`);
      }
    });
    return filterParts.join(` ${this._i18nService.translate(filter.condition)} `);
  }
}

function isRuleSet(thing: Rule | RuleSet): thing is RuleSet {
  return (<RuleSet>thing).condition !== undefined;
}
