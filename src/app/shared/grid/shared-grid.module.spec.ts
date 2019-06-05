import { SharedGridModule } from './shared-grid.module';

describe('SharedGridModule', () => {
  let sharedGridModule: SharedGridModule;

  beforeEach(() => {
    sharedGridModule = new SharedGridModule();
  });

  it('should create an instance', () => {
    expect(sharedGridModule).toBeTruthy();
  });
});
