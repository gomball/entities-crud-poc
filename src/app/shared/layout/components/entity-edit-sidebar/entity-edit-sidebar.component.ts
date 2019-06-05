import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CoreConfig } from '../../../../core/types/core.config';
import { BaseEntityEditServiceContract } from '../../_bases/services/base-entity-edit.service-contract';
import { EntityEditSidebar, EntityEditSidebarTab } from './entity-edit-sidebar.interfaces';

@Component({
  selector: 'ecp-entity-edit-sidebar',
  templateUrl: './entity-edit-sidebar.component.html',
  styleUrls: ['./entity-edit-sidebar.component.scss'],
  exportAs: 'entityEditSidebar'
})
export class EntityEditSidebarComponent implements OnInit, OnDestroy {
  @HostBinding('style.width.px')
  get hostWidth(): number {
    return this._coreConfig.viewportLayout.sidebarWidth;
  }
  @HostBinding('class.disabled')
  get disabled() {
    return this.entityService.form.dirty || this.entityService.isCreateOperation;
  }
  @Input()
  entityService: BaseEntityEditServiceContract;
  @Input()
  sideBarDefinition: EntityEditSidebar;
  private _subsc: Subscription;
  activeTabIndex: number;

  constructor(private readonly _router: Router, private readonly _coreConfig: CoreConfig) {}

  ngOnInit(): void {
    this._setActiveTabIndex();
    this._subsc = this._router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => this._setActiveTabIndex());
  }

  ngOnDestroy(): void {
    this._subsc.unsubscribe();
  }

  private _setActiveTabIndex(): void {
    this.activeTabIndex = this.sideBarDefinition.tabs.findIndex((tab: EntityEditSidebarTab) =>
      this._router.url.endsWith(tab.route || 'form')
    );
  }
}
