import { async, TestBed } from '@angular/core/testing';
import { CoreInjectablesModule } from './core-injectables.module';

describe('CoreInjectablesModule', () => {
  let coreDeclarablesModule: CoreInjectablesModule;

  beforeEach(async(() => {
    coreDeclarablesModule = new CoreInjectablesModule(null, TestBed);
  }));

  it('should create an instance', () => {
    expect(coreDeclarablesModule).toBeTruthy();
  });
});
