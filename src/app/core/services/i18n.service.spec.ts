import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { NgxTranslateStubModule } from '../../_test-stubs/ngx-translate.module';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let serverStub: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxTranslateStubModule],
      providers: [I18nService]
    });
    serverStub = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([I18nService], (service: I18nService) => {
    expect(service).toBeTruthy();
  }));
});
