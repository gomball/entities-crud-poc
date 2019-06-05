import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

@Component({
  selector: 'ecp-stub',
  template: '<form [formGroup]="testForm"><ecp-input ecpCoreControlLayout formControlName="testControl"></ecp-input><form>'
})
class StubComponent {
  @ViewChild(InputComponent)
  control: InputComponent;
  testForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({ testControl: [null] });
  }
}

describe('InputComponent', () => {
  let fixture: ComponentFixture<StubComponent>;
  let stub: StubComponent;
  let control: InputComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputComponent, StubComponent]
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

  it('should create from control', () => {
    expect(control).toBeTruthy();
  });
});
