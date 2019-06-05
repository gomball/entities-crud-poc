import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CROSS_CUTTING_STUB_SERVICE_PROVIDER } from '../../../../_test-stubs/core-injectables.providers';
import { SelectComponent } from './select.component';

@Component({
  selector: 'ecp-stub',
  template: '<form [formGroup]="testForm"><ecp-select ecpCoreControlLayout formControlName="testControl"></ecp-select><form>'
})
class StubComponent {
  @ViewChild(SelectComponent)
  control: SelectComponent;
  testForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({ testControl: [null] });
  }
}

describe('SelectComponent', () => {
  let fixture: ComponentFixture<StubComponent>;
  let stub: StubComponent;
  let control: SelectComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SelectComponent, StubComponent],
      providers: [CROSS_CUTTING_STUB_SERVICE_PROVIDER]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StubComponent);
    stub = fixture.componentInstance;
    // fixturefixture.detectChanges();
    control = stub.control;
  });

  it('should create stub', () => {
    expect(stub).toBeTruthy();
  });

  it('should create form control', () => {
    expect(control).toBeTruthy();
  });
});
