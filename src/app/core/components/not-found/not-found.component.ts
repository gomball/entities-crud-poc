import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'ecp-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(public readonly navigationService: NavigationService, public readonly modalService: ModalService) {}
}
