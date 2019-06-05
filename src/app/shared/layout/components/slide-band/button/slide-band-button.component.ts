import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ecp-slide-band-button',
  templateUrl: './slide-band-button.component.html',
  styleUrls: ['./slide-band-button.component.scss']
})
export class SlideBandButtonComponent {
  @HostBinding('class')
  readonly hostClass = 'btn btn-outline-primary';
  @Input()
  titleKey: string;
  @Input()
  icon: string;
}
