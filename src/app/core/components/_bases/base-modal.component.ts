import { AfterViewInit, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export abstract class BaseModalComponent implements OnInit, AfterViewInit {
  protected constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly _elementRef: ElementRef,
    private readonly _renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const modalBodyElement: Element = this._elementRef.nativeElement.querySelector('.modal-body');
    this._renderer.setStyle(modalBodyElement, 'max-height', `${window.innerHeight * 0.75}px`);
  }

  close(retVal?: any): void {
    this.activeModal.close(retVal);
  }

  dismiss(): void {
    this.activeModal.dismiss('modal canceled');
  }
}
