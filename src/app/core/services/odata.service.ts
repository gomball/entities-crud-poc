import { Injectable } from '@angular/core';
import { chain, forEach, isDate, isEmpty, isNil, isNumber, isString, mapValues, set } from 'lodash';
import buildQuery from 'odata-query';
import { EntityFilterSet, isEntityFilterSet } from '../domain/_types/entity-filter';
import { GUID_REGEXP } from '../types/constants';

export interface ODataResponse<T> {
  '@odata.context': string;
}

export interface ODataSearchResponse<T> extends ODataResponse<T> {
  value: T[];
}

export const MAX_ODATA_SEARCH_RECORDS = 3000;

@Injectable()
export class ODataService {
  constructor() {}

  getODataQueryString(mode: 'search' | 'get', properties: string[], filters?: EntityFilterSet): string {
    let builderObj: any = {};
    forEach(properties, (p) => set(builderObj, p, {}));
    if (mode === 'search') {
      builderObj = this._getODataQueryStringBuilderObjectForSearch(builderObj, filters);
    } else if (mode === 'get') {
      builderObj = this._getODataQueryStringBuilderObjectForGet(builderObj, filters);
    }
    // console.log('OData QS Builder:', builderObj);
    return buildQuery(builderObj);
  }

  private _getODataQueryStringBuilderObjectForSearch(obj: any, filters: EntityFilterSet, isBranch: boolean = false): any {
    const retVal: any = {};
    if (!isBranch) {
      retVal.filter = this._getODataSimpleFiltersString(filters);
      retVal.top = MAX_ODATA_SEARCH_RECORDS;
    }

    const select = chain(obj)
      .pickBy((v, k) => !this._isPropertyExpandable(k, v))
      .keys()
      .value();
    if (!!select.length) {
      retVal.select = [...select];
    }

    const expand = chain(obj)
      .pickBy((v, k) => this._isPropertyExpandable(k, v))
      .mapValues((v) => this._getODataQueryStringBuilderObjectForSearch(v, filters, true))
      .value();
    if (!isEmpty(expand)) {
      retVal.expand = expand;
    }

    return retVal;
  }

  private _getODataQueryStringBuilderObjectForGet(obj: any, filters: EntityFilterSet, isBranch: boolean = false): any {
    const retVal: any = {};
    if (!isBranch) {
      retVal.filter = this._getODataSimpleFiltersString(filters);
    }

    const expand = mapValues(obj, (v) => this._getODataQueryStringBuilderObjectForGet(v, filters, true));
    if (!isEmpty(expand)) {
      retVal.expand = expand;
    }

    return retVal;
  }

  private _getODataSimpleFiltersString(filters: EntityFilterSet): string {
    const filterParts: string[] = [];
    filters.filters.forEach((ef) => {
      if (!isEntityFilterSet(ef)) {
        // if (!ef.value) {
        //   return true;
        // }
        const key: string = (ef.field || '').split('.').join('/');
        if (isNil(ef.value) && ['eq', 'ne'].indexOf(ef.operator || 'eq') >= 0) {
          filterParts.push(`${key} ${ef.operator || 'eq'} null`);
        } else if (isNumber(ef.value)) {
          filterParts.push(`${key} ${ef.operator || 'eq'} ${ef.value}`);
        } else if (isString(ef.value)) {
          if (GUID_REGEXP.test(ef.value)) {
            filterParts.push(`${key} ${ef.operator || 'eq'} ${ef.value}`);
          } else {
            filterParts.push(`${key} ${ef.operator || 'eq'} '${ef.value}'`);
          }
        } else if (isDate(ef.value)) {
          if (!ef.operator || ef.operator === 'eq') {
            const start = ef.value.clone().clearTime();
            const end = ef.value
              .clone()
              .clearTime()
              .addDays(1);
            filterParts.push(`(${key} ge ${start.toISOString()} and ${key} lt ${end.toISOString()})`);
          } else {
            filterParts.push(`${key} ${ef.operator} ${ef.value.clone().toISOString()}`);
          }
        }
      } else {
        filterParts.push(`(${this._getODataSimpleFiltersString(ef)})`);
      }
    });
    return filterParts.join(` ${filters.condition} `);
  }

  private _isPropertyExpandable(propName: string, propValue: any): boolean {
    return !isEmpty(propValue);
  }
}
