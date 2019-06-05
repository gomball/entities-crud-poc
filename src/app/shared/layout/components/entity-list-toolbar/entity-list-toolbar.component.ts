import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CoreConfig } from '../../../../core/types/core.config';
import { BaseEntityListServiceContract } from '../../_bases/services/base-entity-list.service-contract';

@Component({
  selector: 'ecp-entity-list-toolbar',
  templateUrl: './entity-list-toolbar.component.html',
  styleUrls: ['../../_bases/components/entity-base-toolbar.component.scss', './entity-list-toolbar.component.scss']
})
export class EntityListToolbarComponent {
  @HostBinding('style.height.px')
  get hostHeight(): number {
    return this._coreConfig.viewportLayout.entityToolbarHeight;
  }
  @Input()
  entityService: BaseEntityListServiceContract;
  @Input()
  enableCreation = true;
  @Output()
  create = new EventEmitter<void>();
  @Output()
  search = new EventEmitter<void>();

  constructor(private readonly _coreConfig: CoreConfig) {}

  onCreate(): void {
    this.entityService.goToCreate$().subscribe(() => this.create.next());
  }

  onSearch(): void {
    this.entityService.search$().subscribe(() => this.search.next());
  }
}
