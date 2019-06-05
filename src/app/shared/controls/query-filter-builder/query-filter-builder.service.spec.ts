import { TestBed } from '@angular/core/testing';
import { I18N_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/_index';
import { QueryFilterBuilderService } from './query-filter-builder.service';

describe('QueryFilterBuilderService', () => {
  let service: QueryFilterBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryFilterBuilderService, I18N_STUB_SERVICE_PROVIDER]
    });
    service = TestBed.get(QueryFilterBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize filter config properly', () => {
    const filterConfig = service.getInitialFilterConfig('vehicle');
    const expected = jasmine.objectContaining(<any>{
      fields: {
        code: { name: 'code', type: 'string', operators: ['eq', 'ne'] },
        transportMeansId: { name: 'transportMeansId', type: 'string', operators: ['eq', 'ne'] },
        shipperId: { name: 'shipperId', type: 'string-eased', operators: ['eq'] }
      }
    });
    expect(filterConfig).toEqual(expected);
  });

  it('should generate entity filter from query', () => {
    const query = <any>{
      condition: 'or',
      rules: [
        { field: 'name', operator: 'eq', value: 'Bob' },
        { field: 'gender', operator: 'eq', value: 'm' },
        {
          condition: 'and',
          rules: [{ field: 'age', operator: '<=', value: 33 }]
        }
      ]
    };
    const entityFilter = service.getEntityFilterFromQuery(query);
    const expected = jasmine.objectContaining(<any>{
      condition: 'or',
      filters: [
        { field: 'name', operator: 'eq', value: 'Bob' },
        { field: 'gender', operator: 'eq', value: 'm' },
        {
          condition: 'and',
          filters: [{ field: 'age', operator: '<=', value: 33 }]
        }
      ]
    });
    expect(entityFilter).toEqual(expected);
  });

  it('should generate query from entity filter', () => {
    service.getInitialFilterConfig('vehicle');
    const entityFilter = <any>{
      condition: 'or',
      filters: [
        { field: 'code', operator: 'eq', value: 'foo' },
        { field: 'code', operator: 'eq', value: 'bar' },
        {
          condition: 'and',
          filters: [{ field: 'transportMeansId', operator: 'ne', value: '9999XXX' }]
        }
      ]
    };
    const query = service.getQueryFromEntityFilter(entityFilter);
    const expected = jasmine.objectContaining(<any>{
      condition: 'or',
      rules: [
        { field: 'code', operator: 'eq', value: 'foo' },
        { field: 'code', operator: 'eq', value: 'bar' },
        {
          condition: 'and',
          rules: [{ field: 'transportMeansId', operator: 'ne', value: '9999XXX' }]
        }
      ]
    });
    expect(query).toEqual(expected);
  });

  it('should throw when filter not in entity definition', () => {
    service.getInitialFilterConfig('vehicle');
    const entityFilter = <any>{
      condition: 'and',
      filters: [{ field: 'propNotPresent', operator: 'eq', value: 'foo' }]
    };
    expect(() => service.getQueryFromEntityFilter(entityFilter)).toThrow();
  });

  it('should generate proper summary', () => {
    service.getInitialFilterConfig('vehicle');
    const entityFilter = <any>{
      condition: 'or',
      filters: [
        { field: 'code', operator: 'eq', value: 'foo' },
        { field: 'code', operator: 'eq', value: 'bar' },
        {
          condition: 'and',
          filters: [{ field: 'transportMeansId', operator: 'ne', value: '9999XXX' }]
        }
      ]
    };
    const summary = service.getSummary(entityFilter);
    expect(summary).toEqual('!code !eq foo !or !code !eq bar !or (!transportMeansId !ne 9999XXX)');
  });
});
