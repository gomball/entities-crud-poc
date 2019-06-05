import { HostBinding, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { get } from 'lodash';
import { first, map, switchMap } from 'rxjs/operators';
import { Entity } from '../../../../core/domain/_types/entity';
import { EntityEditSidebar } from '../../components/entity-edit-sidebar/entity-edit-sidebar.interfaces';
import { LayoutComponentUiConfiguration } from '../../types/layout-component-ui-configuration';
import { BaseEntityEditService } from '../services/base-entity-edit.service';
import { EntityEditToolbarComponent } from '../../components/entity-edit-toolbar/entity-edit-toolbar.component';

export abstract class BaseEntityEditComponent<T extends Entity> implements OnInit {
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
    return get(this, '_uiConfiguration.containsMainGrid', false);
  }
  @ViewChild('entityEditToolbar')
  entityListToolbar: EntityEditToolbarComponent;

  abstract sidebar: EntityEditSidebar;

  constructor(
    public readonly entityService: BaseEntityEditService<T>,
    protected readonly currentRoute: ActivatedRoute,
    private readonly _uiConfiguration: LayoutComponentUiConfiguration
  ) {}

  ngOnInit(): void {
    this.currentRoute.params
      .pipe(
        map((params: Params) => params['id']),
        first(),
        switchMap((entityId: string) => this.entityService.loadForEdit$(entityId || null))
      )
      .subscribe(() => this.entityService.resetForm());
  }
}
