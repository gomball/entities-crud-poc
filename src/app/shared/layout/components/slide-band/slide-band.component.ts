import { Component, Input } from '@angular/core';
import { SlideBandService } from './slide-band.service';

@Component({
  selector: 'ecp-slide-band',
  templateUrl: './slide-band.component.html',
  styleUrls: ['./slide-band.component.scss']
})
export class SlideBandComponent {
  @Input()
  titleKey: string;
  @Input()
  icon: string;
  @Input()
  opened = false;

  constructor(private readonly _slideBandService: SlideBandService) {
    this._slideBandService.hideAll$.subscribe(() => this.opened = false);
  }

  open(): void {
    this.closeAll();
    this.opened = true;
  }

  closeAll(): void {
    this._slideBandService.hideAll();
  }
}
