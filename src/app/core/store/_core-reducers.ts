import * as HttpCallsCounter from './http-calls-counter';
import * as ScreenDimensions from './screen-dimensions';
import * as SpinnerMessage from './spinner-message';

export const coreReducers: any = {
  httpCallsCounter: HttpCallsCounter.reducer,
  screenDimensions: ScreenDimensions.reducer,
  spinnerMessage: SpinnerMessage.reducer
};
