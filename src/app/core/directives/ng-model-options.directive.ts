import { Directive, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Observable, Subscription, merge, timer } from 'rxjs';
import { map, debounce, distinctUntilChanged, tap } from 'rxjs/operators';

const DEFAULT_OPTIONS = {
  updateOn: 'input',
  debounce: null
};

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[ngModel][ngModelOptions],[formControlName][ngModelOptions],[formControl][ngModelOptions]',
  /* tslint:enable */
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgModelOptionsDirective),
      multi: true
    }
  ]
})
export class NgModelOptionsDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private _options: any;
  private _subsc: Subscription;
  onChange: any;
  onTouched: any;

  @Output()
  ngModelChange = new EventEmitter<any>();

  @Input()
  set ngModelOptions(val) {
    this._options = { ...DEFAULT_OPTIONS, ...val };
  }

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngOnInit() {
    const events$ = this._options.updateOn
      .split(' ')
      .pipe(map((eventType: string) => fromEvent<Event>(this.element.nativeElement, eventType)));
    this._subsc = merge(...events$)
      .pipe(
        map((e: Event) => ({ type: e.type, value: e.target['value'] })),
        debounce((event) => this._debounce$(event)),
        distinctUntilChanged((prevEvent, currEvent) => prevEvent.value === currEvent.value),
        tap((event) => this.onChange(event.value))
      )
      .subscribe((event) => this.ngModelChange.next(event.value));
  }

  ngOnDestroy() {
    this._subsc.unsubscribe();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this.renderer.setProperty(this.element.nativeElement, 'value', normalizedValue);
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
  }

  private _debounce$(event: any): Observable<any> {
    switch (typeof this._options.debounce) {
      case 'number':
        return timer(this._options.debounce);
      case 'object':
        return timer(this._options.debounce[event.type]);
      default:
        return timer(0);
    }
  }
}
