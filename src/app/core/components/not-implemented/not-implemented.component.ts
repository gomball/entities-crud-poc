import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'ecp-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.scss']
})
export class NotImplementedComponent {
  constructor(public readonly navigationService: NavigationService, public readonly modalService: ModalService) {}
}
