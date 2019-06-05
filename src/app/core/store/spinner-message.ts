import { TypedAction, UntypedAction } from './types/actions';

const SHOW = 'spinner-message.show';
const HIDE = 'spinner-message.hide';

export class Show extends TypedAction<string> {
  readonly type = SHOW;
}

export class Hide extends UntypedAction {
  readonly type = HIDE;
}

export type ActionTypes = Show | Hide;

export function reducer(state: string = null, action: ActionTypes): string {
  switch (action.type) {
    case SHOW:
      return action.payload;

    case HIDE:
      return null;

    default:
      return state;
  }
}
