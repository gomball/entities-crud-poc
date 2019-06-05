import { NgModule, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

export class StoreStub<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}

export const STORE_STUB_PROVIDER: Provider = { provide: Store, useClass: StoreStub };

@NgModule({
  providers: [STORE_STUB_PROVIDER]
})
export class StoreStubModule {}
