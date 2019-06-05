import { AfterViewInit, Directive, ElementRef, Input, Renderer2, RendererStyleFlags2 } from '@angular/core';

@Directive({
  selector: '[ecpCoreControlLayout]'
})
export class ControlLayoutDirective implements AfterViewInit {
  @Input()
  layout: 'inline' | 'stacked' | 'none' = 'inline';
  @Input()
  width: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5' = '2';
  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input()
  label?: string;

  constructor(private readonly _elementRef: ElementRef, private readonly _renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.layout === 'inline') {
      this._traverseInline();
    } else if (this.layout === 'stacked') {
      this._traverseStacked();
    } else if (this.layout === 'none') {
      this._traverseNone();
    }
  }

  private _traverseInline() {
    const nEl = this._elementRef.nativeElement as Element;
    const control = ['input', 'select', 'textarea'].indexOf(nEl.tagName) >= 0 ? nEl : nEl.querySelector('input, select, textarea');

    if (this.label) {
      const label = this._renderer.createElement('label');
      label.innerHTML = this.label;
      this._addClassesToElement(label, 'col-md-1', 'col-form-label', `col-form-label-${this.size}`, 'text-right');
      this._renderer.insertBefore(nEl.parentNode, label, nEl);
    }

    if (!!control) {
      this._addClassesToElement(nEl, `col-md-${this.width}`);
    }

    this._processSize(nEl);
  }

  private _traverseStacked(): void {
    const nEl = this._elementRef.nativeElement as Element;
    const control = nEl.querySelector('input, select, textarea');

    if (this.label) {
      const label = this._renderer.createElement('label');
      label.innerHTML = this.label;
      this._addClassesToElement(label, 'form-control-label', 'mb-0', 'd-inline-flex');
      this._renderer.insertBefore(nEl, label, nEl.querySelector('*'));
    }

    if (!!control) {
      this._addClassesToElement(nEl, 'form-group', `col-md-${this.width}`);
    }

    this._processSize(nEl);
  }

  private _traverseNone(): void {
    const nEl = this._elementRef.nativeElement as Element;
    this._processSize(nEl);
  }

  private _processSize(nEl: Element): void {
    if (this.size) {
      ['form-control', 'custom-select', 'btn', 'input-group', 'btn-group'].forEach((className: string) => {
        const target = nEl.classList.contains(className) ? nEl : nEl.querySelector(`.${className}`);
        if (target) {
          this._addClassesToElement(target, `${className}-${this.size}`);
        }
      });
    }
  }

  private _addClassesToElement(el: Element, ...classNames: string[]): void {
    classNames.forEach((className: string) => this._renderer.addClass(el, className));
  }

  private _addStylesToElement(el: Element, styles: { [prop: string]: { text: string; flags: RendererStyleFlags2 } }): void {
    for (const key in styles) {
      if (styles.hasOwnProperty(key)) {
        const value = styles[key];
        this._renderer.setStyle(el, key, value.text, value.flags);
      }
    }
  }
}
