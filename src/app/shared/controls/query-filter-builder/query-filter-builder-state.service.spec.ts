import { async, TestBed } from '@angular/core/testing';
import { get } from 'lodash';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../../_test-stubs/_index';
import { QueryFilterBuilderStateService } from './query-filter-builder-state.service';
import { StorageKeys } from '../../../core/services/storage.service';

describe('QueryFilterBuilderStateService', () => {
  let service: QueryFilterBuilderStateService;
  let qfbComponent: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryFilterBuilderStateService, CROSS_CUTTING_STUB_SERVICE_PROVIDER]
    });
    service = TestBed.get(QueryFilterBuilderStateService);
    qfbComponent = { entityName: 'testEntity', query: { condition: 'and', rules: [] } };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save state', async(() => {
    service.saveState$('', qfbComponent).subscribe((newName) => {
      expect(newName).toEqual('testValue');
      expect(service.getStates()).toContain(newName);
      expect(get(service, '_currentStates.testEntity.testValue')).toEqual(jasmine.objectContaining({ condition: 'and', rules: [] }));
    });
  }));

  it('should apply state', async(() => {
    service['_xcs'].storage['_store'] = {
      [StorageKeys.QUERY_FILTER_STATES]: { testEntity: { testName: { condition: 'and', rules: [] } } }
    };
    service.applyState('testName', qfbComponent);
    expect(qfbComponent.query).toEqual(jasmine.objectContaining({ condition: 'and', rules: [] }));
  }));

  it('should remove state', async(() => {
    service.removeState('testName', qfbComponent);
    const entitySates = service.getStates().find((s) => s === 'testEntity');
    expect(get(entitySates, 'testName')).toBeUndefined();
    expect(qfbComponent.query).toBeNull();
  }));
});
