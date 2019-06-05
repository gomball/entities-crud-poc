import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CoreConfig } from '../../types/core.config';
import { TopbarService } from './topbar.service';

@Component({
  selector: 'ecp-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [TopbarService]
})
export class TopbarComponent {
  topbarHeight$: Observable<number>;

  constructor(public readonly service: TopbarService, private readonly _coreConfig: CoreConfig) {
    this.topbarHeight$ = this.service.isTopbarVisible$.pipe(
      map((isTopbarVisible) => (isTopbarVisible ? this._coreConfig.viewportLayout.topbarHeight : 0))
    );
  }
}
