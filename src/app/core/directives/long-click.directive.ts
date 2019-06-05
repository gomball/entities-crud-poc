import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[longClick]'
  /* tslint:enable */
})
export class LongClickDirective {
  @Input()
  disabled: boolean;
  @Output()
  longClick = new EventEmitter<void>();

  private _timeoutHandler: any;
  private _localMouseX = 0;
  private _localMouseY = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    // only left click: don't handle right/middle clicks
    if ($event.button === 0) {
      this._localMouseX = $event.clientX;
      this._localMouseY = $event.clientY;
      this._timeoutHandler = setTimeout(() => !this.disabled && this.longClick.next(), 1000);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    const xThres = $event.clientX - this._localMouseX > 10;
    const yThres = $event.clientY - this._localMouseY > 10;
    if (xThres || yThres) {
      clearTimeout(this._timeoutHandler);
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    clearTimeout(this._timeoutHandler);
  }
}
