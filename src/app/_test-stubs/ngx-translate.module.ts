import { NgModule, Pipe, PipeTransform, Provider } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

export class NgxTranslateStubService {
  public get(key: any): any {
    return of(key);
  }
}

export const NGX_TRANSLATE_STUB_SERVICE_PROVIDER: Provider = {
  provide: NgxTranslateService,
  useClass: NgxTranslateStubService
};

@Pipe({ name: 'translate' })
export class NgxTranslateStubPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    return value;
  }
}

@NgModule({
  declarations: [NgxTranslateStubPipe],
  providers: [NGX_TRANSLATE_STUB_SERVICE_PROVIDER],
  exports: [NgxTranslateStubPipe]
})
export class NgxTranslateStubModule {}
