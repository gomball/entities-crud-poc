import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowDirective } from '../../../../core/directives/show.directive';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { EasedInputComponent } from './eased-input.component';

@Component({
  selector: 'ecp-stub',
  template: '<form [formGroup]="testForm"><ecp-eased-input formControlName="testControl"></ecp-eased-input><form>'
})
class StubComponent {
  @ViewChild(EasedInputComponent)
  control: EasedInputComponent;
  testForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({ testControl: [null] });
  }
}

describe('EasedInputComponent', () => {
  let fixture: ComponentFixture<StubComponent>;
  let stub: StubComponent;
  let control: EasedInputComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [EasedInputComponent, StubComponent, ShowDirective],
      providers: [CROSS_CUTTING_STUB_SERVICE_PROVIDER, MODAL_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StubComponent);
    stub = fixture.componentInstance;
    // fixture.detectChanges();
    control = stub.control;
  });

  it('should create stub', () => {
    expect(stub).toBeTruthy();
  });

  it('should create form control', () => {
    expect(control).toBeTruthy();
  });
});
