import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CoreConfig } from '../../../../core/types/core.config';
import { BaseEntityEditServiceContract } from '../../_bases/services/base-entity-edit.service-contract';

@Component({
  selector: 'ecp-entity-edit-toolbar',
  templateUrl: './entity-edit-toolbar.component.html',
  styleUrls: ['../../_bases/components/entity-base-toolbar.component.scss', './entity-edit-toolbar.component.scss'],
  exportAs: 'entityEditToolbar'
})
export class EntityEditToolbarComponent implements OnInit, OnDestroy {
  @HostBinding('style.height.px')
  get hostHeight(): number {
    return this._coreConfig.viewportLayout.entityToolbarHeight;
  }
  @Input()
  entityService: BaseEntityEditServiceContract;
  @Output()
  save: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  undo: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  delete: EventEmitter<void> = new EventEmitter<void>();
  private _subsc: Subscription;
  editionMode: boolean;

  constructor(private _router: Router, private readonly _coreConfig: CoreConfig) {}

  ngOnInit(): void {
    this._setEditionMode();
    this._subsc = this._router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => this._setEditionMode());
  }

  ngOnDestroy(): void {
    this._subsc.unsubscribe();
  }

  onSave(): void {
    this.entityService.save$().subscribe(() => this.save.next());
  }

  onBack(): void {
    this.entityService.goToList$().subscribe(() => this.back.next());
  }

  onUndo(): void {
    this.entityService.resetForm();
    this.undo.next();
  }

  onDelete(): void {
    this.entityService
      .delete$()
      .pipe(switchMap(() => this.entityService.goToList$()))
      .subscribe(() => this.delete.next());
  }

  private _setEditionMode() {
    this.editionMode = this._router.url.endsWith('form');
  }
}
