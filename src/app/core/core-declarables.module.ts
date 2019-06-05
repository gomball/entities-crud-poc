/* tslint:disable:max-line-length */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TranslateModule as NgxTranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { InvalidScreenDimensionsLockerComponent } from './components/invalid-screen-dimensions-locker/invalid-screen-dimensions-locker.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';
import { PromptModalComponent } from './components/prompt-modal/prompt-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { BlinkDirective } from './directives/blink.directive';
import { LongClickDirective } from './directives/long-click.directive';
import { NgModelOptionsDirective } from './directives/ng-model-options.directive';
import { ShowDirective } from './directives/show.directive';
import { ViewportLayoutAdjusterDirective } from './directives/viewport-layout-adjuster.directive';
import { AbsoluteNumberPipe } from './pipes/absolute-number.pipe';
import { KeyValuePairsPipe } from './pipes/key-value-pairs.pipe';
/* tslint:enable */

const ENTRY_COMPONENTS = [
  AlertModalComponent,
  ConfirmModalComponent,
  ErrorModalComponent,
  InvalidScreenDimensionsLockerComponent,
  NotFoundComponent,
  NotImplementedComponent,
  PromptModalComponent
];
const COMPONENTS = [SpinnerComponent, TopbarComponent, ...ENTRY_COMPONENTS];

const DIRECTIVES = [BlinkDirective, ShowDirective, NgModelOptionsDirective, LongClickDirective, ViewportLayoutAdjusterDirective];

const PIPES = [KeyValuePairsPipe, AbsoluteNumberPipe];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxTranslateModule],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [CommonModule, NgbModule, StoreModule, NgxTranslateModule, ToastrModule, ...COMPONENTS, ...DIRECTIVES, ...PIPES]
})
export class CoreDeclarablesModule {}
