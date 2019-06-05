import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CoreConfig } from '../types/core.config';
import { ScreenDimensions } from '../types/screen-dimensions';

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[ecpCoreViewportLayoutAdjuster]'
  /* tslint:enable */
})
export class ViewportLayoutAdjusterDirective implements OnInit, OnDestroy {
  private _subsc: Subscription;

  constructor(
    private readonly _store: Store<any>,
    private readonly _elementRef: ElementRef,
    private readonly _renderer: Renderer2,
    private readonly _coreConfig: CoreConfig
  ) {}

  ngOnInit(): void {
    this._subsc = this._store
      .select<ScreenDimensions>('screenDimensions')
      .subscribe((sd) => setTimeout(this._recalculateLayout.bind(this, sd)));
  }

  ngOnDestroy(): void {
    this._subsc.unsubscribe();
  }

  private _recalculateLayout(sd: ScreenDimensions) {
    this._elementRef.nativeElement.querySelectorAll('.ecp-layout-adjustable').forEach((element: Element) => {
      const entityToolbarSubstract = this._getEntityToolbarsHeightSubstract(element);
      const mainGridToolbarSubstract = this._getMainGridToolbarsHeightSubstract(element);
      const elementHeight = sd.height - (entityToolbarSubstract + mainGridToolbarSubstract + this._coreConfig.viewportLayout.topbarHeight);
      this._renderer.setStyle(element, 'height', elementHeight + 'px');
      this._renderer.setStyle(element, 'display', 'block');
    });
  }

  private _getEntityToolbarsHeightSubstract(element: Element, recursiveReducer: number = 0): number {
    const containstToolbar = !!element && element.classList.contains('ecp-contains-toolbar');
    return !!element && element.classList.contains('ecp-layout-adjustable')
      ? this._getEntityToolbarsHeightSubstract(
          element.parentElement.closest('.ecp-layout-adjustable'),
          recursiveReducer + (containstToolbar ? this._coreConfig.viewportLayout.entityToolbarHeight : 0)
        )
      : recursiveReducer + (containstToolbar ? this._coreConfig.viewportLayout.entityToolbarHeight : 0);
  }

  private _getMainGridToolbarsHeightSubstract(element: Element): number {
    return element.classList.contains('ecp-contains-main-grid') ? this._coreConfig.viewportLayout.gridToolbarHeight : 0;
  }
}
