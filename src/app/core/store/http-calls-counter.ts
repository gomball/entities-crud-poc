import { UntypedAction } from './types/actions';

const INCREMENT = 'http-call-counter.increment';
const DECREMENT = 'http-call-counter.decrement';
const RESET = 'http-call-counter.reset';

export class Increment extends UntypedAction {
  readonly type = INCREMENT;
}

export class Decrement extends UntypedAction {
  readonly type = DECREMENT;
}

export class Reset extends UntypedAction {
  readonly type = RESET;
}

export type ActionTypes = Increment | Decrement | Reset;

export function reducer(state: number = 0, action: ActionTypes): number {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    case DECREMENT:
      return state - 1;

    case RESET:
      return 0;

    default:
      return state;
  }
}
