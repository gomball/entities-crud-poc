import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import * as ScreenDimensionsTypes from '../../store/screen-dimensions';
import { CoreConfig } from '../../types/core.config';
import { ScreenDimensions } from '../../types/screen-dimensions';

const NOT_ENOUGH_WIDTH_MESSAGE = 'not enough room to show my superpowers';

@Component({
  selector: 'ecp-invalid-screen-dimensions-locker',
  templateUrl: './invalid-screen-dimensions-locker.component.html',
  styleUrls: ['./invalid-screen-dimensions-locker.component.scss']
})
export class InvalidScreenDimensionsLockerComponent implements OnInit, OnDestroy {
  private _destroySubj = new Subject<void>();
  message: string = NOT_ENOUGH_WIDTH_MESSAGE;
  isScreenDimensionsOk$: Observable<boolean>;

  constructor(private readonly _router: Router, private readonly _store: Store<any>, private readonly _coreConfig: CoreConfig) {
    const fromRoute$ = this._router.events.pipe(filter((event) => event instanceof NavigationEnd));
    const fromEvent$ = fromEvent(window, 'resize').pipe(debounceTime(100));
    merge(fromRoute$, fromEvent$)
      .pipe(
        takeUntil(this._destroySubj.asObservable()),
        map(() => ({ width: window.innerWidth, height: window.innerHeight } as ScreenDimensions)),
        tap((sd) => this._store.dispatch(new ScreenDimensionsTypes.Set(sd)))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.isScreenDimensionsOk$ = this._store.select<ScreenDimensions>('screenDimensions').pipe(
      filter((sd) => sd.width > 0 && sd.height > 0),
      map((sd) => sd.width < this._coreConfig.viewportLayout.minScreenWidth || sd.height < this._coreConfig.viewportLayout.minScreenHeight)
    );
  }

  ngOnDestroy(): void {
    this._destroySubj.next();
  }
}
