import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { CrossCuttingService } from '../../core/services/cross-cutting.service';
import { GridStateService } from './grid-state.service';
import { GridOptions, GridWidget } from './grid.interfaces';
import { GridService } from './grid.service';

@Component({
  selector: 'ecp-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [GridService, GridStateService],
  exportAs: 'gridComponent'
})
export class GridComponent implements OnInit, OnChanges {
  @Input()
  readonly id: string;
  @Input()
  options: GridOptions;
  @Input()
  data: any[];
  @Output()
  ready: EventEmitter<void> = new EventEmitter<void>();
  widget: GridWidget;
  gridOptions: any;
  gridStateNames: string[];
  gridStateName: string;

  constructor(
    public readonly gridService: GridService,
    public readonly gridStateService: GridStateService,
    public readonly xcs: CrossCuttingService
  ) {
    this.id = this.xcs.routeBasedId;
  }

  ngOnInit(): void {
    this.gridService.ready$
      .pipe(
        filter((widget) => widget.gridId === this.id),
        first()
      )
      .subscribe((widget) => {
        this.widget = widget;
        this.gridStateNames = this.gridStateService.getStates(this.widget);
        this.ready.emit();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && !this.gridOptions) {
      this.gridOptions = this.gridService.getGridOptions(this.options, this.id);
    }
  }

  saveState(): void {
    this.gridStateService.saveState$(this.gridStateName, this.widget).subscribe((newGridStateName) => {
      this.gridStateNames = this.gridStateService.getStates(this.widget);
      this.gridStateName = newGridStateName;
      this.applyState();
    });
  }

  applyState(gridStateName?: string): void {
    this.gridStateService.applyState(this.gridStateName, this.widget);
  }

  removeState(gridStateName?: string): void {
    this.gridStateService.removeState(this.gridStateName, this.widget);
    this.gridStateNames = this.gridStateService.getStates(this.widget);
    this.gridStateName = '';
    this.applyState();
  }
}
