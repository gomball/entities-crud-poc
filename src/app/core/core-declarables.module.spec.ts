import { CoreDeclarablesModule } from './core-declarables.module';

describe('CoreDeclarablesModule', () => {
  let coreDeclarablesModule: CoreDeclarablesModule;

  beforeEach(() => {
    coreDeclarablesModule = new CoreDeclarablesModule();
  });

  it('should create an instance', () => {
    expect(coreDeclarablesModule).toBeTruthy();
  });
});
