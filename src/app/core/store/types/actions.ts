import { Action } from '@ngrx/store';

export abstract class AbstractTypedAction implements Action {
  type: string;
  payload?: any;
}

export class TypedAction<T> extends AbstractTypedAction {
  constructor(public payload: T) {
    super();
  }
}

export class UntypedAction extends AbstractTypedAction {}
