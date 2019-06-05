import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SlideBandService {
  private _hideAllSubj = new BehaviorSubject<void>(null);

  hideAll$ = this._hideAllSubj.asObservable();

  hideAll(): void {
    this._hideAllSubj.next(null);
  }
}
