import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { EntityEditSidebarTab } from '../entity-edit-sidebar.interfaces';

@Component({
  selector: 'ecp-entity-edit-sidebar-tab',
  templateUrl: './entity-edit-sidebar-tab.component.html',
  styleUrls: ['./entity-edit-sidebar-tab.component.scss']
})
export class EntityEditSidebarTabComponent {
  @Input()
  tab: EntityEditSidebarTab;
  @Input()
  @HostBinding('class.active')
  active: boolean;
  @Input()
  @HostBinding('class.disabled')
  disabled: boolean;
  tabTitleClass = 'tab-title-invisible';

  @HostListener('mouseover', ['$event'])
  @HostListener('mouseout', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent($event: MouseEvent) {
    if (!this.disabled) {
      this.tabTitleClass = event.type === 'mouseover' ? 'tab-title-visible' : 'tab-title-invisible';
    }
  }
}
