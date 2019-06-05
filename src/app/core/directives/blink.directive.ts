import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[blink]'
  /* tslint:enable */
})
export class BlinkDirective implements OnInit {
  @HostBinding('style.visibility')
  _hostVisibility: 'visible' | 'hidden' = 'visible';
  @Input()
  blink = true;
  private _timer: any;

  ngOnInit(): void {
    this._timer = setInterval(
      () => (this._hostVisibility = this.blink ? (this._hostVisibility === 'visible' ? 'hidden' : 'visible') : 'visible'),
      500
    );
  }
}
