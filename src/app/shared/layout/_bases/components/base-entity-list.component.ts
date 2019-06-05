import { HostBinding, ViewChild } from '@angular/core';
import { get } from 'lodash';
import { GridComponent } from '../../../grid/grid.component';
import { LayoutComponentUiConfiguration } from '../../types/layout-component-ui-configuration';
import { BaseEntityListService } from '../services/base-entity-list.service';
import { Entity } from '../../../../core/domain/_types/entity';
import { EntityListToolbarComponent } from '../../components/entity-list-toolbar/entity-list-toolbar.component';

export abstract class BaseEntityListComponent<T extends Entity> {
  @HostBinding('class.ecp-layout-adjustable')
  get layoutAdjustable(): boolean {
    return get(this, '_uiConfiguration.layoutAdjustable', true);
  }
  @HostBinding('class.ecp-contains-toolbar')
  get containsToolbar(): boolean {
    return get(this, '_uiConfiguration.containsToolbar', true);
  }
  @HostBinding('class.ecp-contains-main-grid')
  get containsMainGrid(): boolean {
    return get(this, '_uiConfiguration.containsMainGrid', true);
  }
  @ViewChild('mainGrid')
  mainGrid: GridComponent;
  @ViewChild('entityListToolbar')
  entityListToolbar: EntityListToolbarComponent;

  constructor(public readonly entityService: BaseEntityListService<T>, private readonly _uiConfiguration: LayoutComponentUiConfiguration) {
    // entityService.entityList$
    //   .filter((data: T[]) => !!data && !!data.length)
    //   .first()
    //   .subscribe(() =>
    //     setTimeout(() => this.mainGrid.service.columnApi.autoSizeAllColumns(), 1000));
  }
}
