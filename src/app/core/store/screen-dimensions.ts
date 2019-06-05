import { ScreenDimensions } from '../types/screen-dimensions';
import { TypedAction, UntypedAction } from './types/actions';

const SET = 'screen-dimensions.set';
const RESET = 'screen-dimensions.reset';

export class Set extends TypedAction<ScreenDimensions> {
  readonly type = SET;
}

export class Reset extends UntypedAction {
  readonly type = RESET;
}

export type ActionTypes = Set | Reset;

export function reducer(state: ScreenDimensions = { width: 0, height: 0 }, action: ActionTypes): ScreenDimensions {
  switch (action.type) {
    case SET:
      return action.payload;

    case RESET:
      return { width: 0, height: 0 };

    default:
      return state;
  }
}
