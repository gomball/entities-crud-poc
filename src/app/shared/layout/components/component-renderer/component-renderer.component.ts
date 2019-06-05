import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

/**
 * @description this comp does not support instantiating components with 2w binding!!!
 * @see https://stackoverflow.com/a/39951710
 */
@Component({
  selector: 'ecp-component-renderer',
  template: '<div #container></div>'
})
export class ComponentRendererComponent implements OnInit, OnDestroy {
  @Input()
  type: Type<any>;
  @Input()
  inputs?: any;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  private _componentRef: ComponentRef<any>;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    if (this.type) {
      const factory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory<any>(this.type);
      this._componentRef = this.container.createComponent(factory);
      if (this.inputs) {
        Object.assign(this._componentRef.instance, this.inputs);
      }
      this._componentRef.changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }
}
