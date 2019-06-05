import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { isNil, isObject, isString, orderBy } from 'lodash';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { CrossCuttingService } from '../../../../core/services/cross-cutting.service';
import { ModalService } from '../../../../core/services/modal.service';
import { BaseControlComponent } from '../_bases/base-control.component';
import { EasedInputInfoModalComponent } from './eased-input-info/eased-input-info.component';
import { EasedInputResultsModalComponent } from './eased-input-results/eased-input-results.component';

type InternalStatus = 'waitingInput' | 'searching' | 'ambiguous' | 'noResult' | 'settled';

@Component({
  selector: 'ecp-eased-input',
  templateUrl: './eased-input.component.html',
  styleUrls: ['./eased-input.component.scss']
})
export class EasedInputComponent extends BaseControlComponent implements OnInit, OnDestroy {
  @Input()
  valueProperty: string;
  @Input()
  descriptionProperty: string;
  @Input()
  type = 'party';
  @Input()
  tags: string;
  @Input()
  eased = true;
  @ViewChild('textInputElement')
  textInputElement: ElementRef;
  @ViewChild('helpInputElement')
  helpInputElement: ElementRef;

  internalStatus: InternalStatus = 'waitingInput';
  private _model: any = null;
  private _subsc: Subscription;
  private _textValue = new Subject<string>();

  constructor(
    ngControl: NgControl,
    host: ElementRef,
    private readonly _xcs: CrossCuttingService,
    private readonly _localModalService: ModalService
  ) {
    super(ngControl, host);
  }

  writeValue(value: any) {
    if (isString(value) && !!value) {
      this._get$(value, 'getById')
        .pipe(tap((result: any) => this._setModel(result, false)))
        .subscribe();
    } else if (isObject(value) || isNil(value)) {
      this.textInputElement.nativeElement.value = null;
      this._setModel(value, false);
    }
  }

  ngOnInit(): void {
    this._subsc = this._textValue
      .asObservable()
      .pipe(
        tap(() => this._setModel(null, true)),
        debounceTime(750),
        filter((value: any) => !!value),
        switchMap((value: string) => this._get$(value, 'getByCode')),
        filter((result: any) => !!result),
        tap((result: any) => this._setModel(result, true))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._subsc.unsubscribe();
  }

  onTextChange(value: string): void {
    this._textValue.next(value);
  }

  openHelp(): void {
    if (this.internalStatus === 'settled') {
      this._localModalService.custom$(EasedInputInfoModalComponent, { element: this._model });
    } else if (this.internalStatus === 'ambiguous') {
      this._search$(this.textInputElement.nativeElement.value)
        .pipe(
          map((list) => orderBy(list, ['code', this.descriptionProperty])),
          switchMap((list: any[]) =>
            this._localModalService.custom$(EasedInputResultsModalComponent, { list, properties: ['code', this.descriptionProperty] })
          ),
          filter((result: any) => !!result),
          mergeMap((result: any) => this._get$(result.code, 'getByCode')),
          tap((result: any) => this._setModel(result, true))
        )
        .subscribe();
    }
  }

  private _setModel(value: any, emit: boolean): void {
    this._model = value || null;
    if (isObject(this._model)) {
      this.textInputElement.nativeElement.value = this._model['code'];
      this.helpInputElement.nativeElement.value = this._model[this.descriptionProperty];
    } else if (this._model === null) {
      this.helpInputElement.nativeElement.value = null;
    }
    this.internalStatus = !!this._model ? 'settled' : 'waitingInput';
    if (emit) {
      this.emitChange(isObject(this._model) ? this._model[this.valueProperty] : null);
      this.emitTouched();
    }
  }

  private _get$(value: string, mode: 'getById' | 'getByCode'): Observable<any> {
    const prevInternalMode: InternalStatus = this.internalStatus;
    this.internalStatus = 'searching';
    const url: string = this._getUrl(value, mode);
    return this._xcs.http.get$<any>(url).pipe(
      catchError((error: any) => of(error.status === 300 ? '' : error)),
      tap((result: any) => (this.internalStatus = isNil(result) ? 'noResult' : result === '' ? 'ambiguous' : prevInternalMode)),
      tap(() => (this.helpInputElement.nativeElement.value = '[' + this._xcs.i18n.translate(this.internalStatus) + ']')),
      filter((result) => !!result)
    );
  }

  private _search$(value: string): Observable<any[]> {
    const prevInternalMode: InternalStatus = this.internalStatus;
    this.internalStatus = 'searching';
    const url: string = this._getUrl(value, 'search');
    return this._xcs.http.get$<any[]>(url).pipe(tap(() => (this.internalStatus = prevInternalMode)));
  }

  private _getUrl(value: string, mode: 'getById' | 'getByCode' | 'search'): string {
    let retVal = `${environment.REST_API_URL}/${this.type}`;
    switch (mode) {
      case 'getById':
        retVal += `/get`;
        break;
      case 'getByCode':
        retVal += `/getForTextHelper`;
        break;
      case 'search':
        retVal += `/searchForTextHelper`;
        break;
    }
    switch (mode) {
      case 'getById':
        retVal += `?id=${value}`;
        break;
      case 'getByCode':
      case 'search':
        retVal += `?code=${value}`;
        if (!!this.tags) {
          retVal += `&tags=${this.tags}`;
        }
        break;
    }
    return retVal;
  }
}
