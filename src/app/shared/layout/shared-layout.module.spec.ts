import { SharedLayoutModule } from './shared-layout.module';

describe('SharedLayoutModule', () => {
  let sharedLayoutModule: SharedLayoutModule;

  beforeEach(() => {
    sharedLayoutModule = new SharedLayoutModule();
  });

  it('should create an instance', () => {
    expect(sharedLayoutModule).toBeTruthy();
  });
});
