import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[show]'
  /* tslint:enable */
})
export class ShowDirective implements OnChanges {
  @Input()
  show: boolean;

  constructor(private host: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const nv: boolean = changes['show'].currentValue;
    const ov: boolean = changes['show'].previousValue;
    if (nv !== ov) {
      this.host.nativeElement.hidden = !nv;
    }
  }
}
