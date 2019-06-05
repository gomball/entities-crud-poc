import { Component } from '@angular/core';
import { CoreConfig } from '../../../../core/types/core.config';

@Component({
  selector: 'ecp-entity-edit-body',
  templateUrl: './entity-edit-body.component.html',
  styleUrls: ['./entity-edit-body.component.scss']
})
export class EntityEditBodyComponent {
  get contentLeftPadding(): number {
    return this._coreConfig.viewportLayout.sidebarWidth;
  }

  constructor(private readonly _coreConfig: CoreConfig) {}
}
