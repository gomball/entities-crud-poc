import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './datepicker.component';

@Component({
  selector: 'ecp-stub',
  template:
    '<form [formGroup]="testForm"><ecp-datepicker ecpCoreControlLayout formControlName="testControl"></ecp-datepicker><form>'
})
class StubComponent {
  @ViewChild(DatepickerComponent)
  control: DatepickerComponent;
  testForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({ testControl: [null] });
  }
}

describe('DatepickerComponent', () => {
  let fixture: ComponentFixture<StubComponent>;
  let stub: StubComponent;
  let control: DatepickerComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, NgbDatepickerModule],
      declarations: [DatepickerComponent, StubComponent]
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
