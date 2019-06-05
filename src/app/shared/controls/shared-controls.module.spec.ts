import { SharedControlsModule } from './shared-controls.module';

describe('SharedControlsModule', () => {
  let module: SharedControlsModule;

  beforeEach(() => {
    module = new SharedControlsModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
