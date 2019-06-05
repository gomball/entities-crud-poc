import { FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

/** @see https://github.com/angular/angular/issues/18867#issuecomment-357484102 */

// @dynamic
export class FormService {
  static initialize(controls: Object | string[]): FormGroup {
    const controlConfig: { [key: string]: any } = {};
    if (Object.prototype.toString.call(controls) === '[object Object]') {
      (Object.keys(controls) || []).forEach((controlName: string) => (controlConfig[controlName] = [controls[controlName]]));
    } else if (Object.prototype.toString.call(controls) === '[object Array]') {
      (<string[]>controls || []).forEach((controlName: string) => (controlConfig[controlName] = ['']));
    }
    const retVal = new FormBuilder().group(controlConfig);
    setTimeout(() => retVal.markAsPristine());
    return retVal;
  }

  static populate(form: FormGroup, values: any): FormGroup {
    Object.keys(form.getRawValue()).forEach((controlName: any) => form.controls[controlName].setValue(values[controlName] || null));
    return form;
  }

  static getRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = !!control.value;
      return valid ? null : { required: { value: control.value } };
    };
  }

  static getRequiredIfValidator(requiredExpr: () => boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = !requiredExpr() || !!control.value;
      return valid ? null : { required: { value: control.value } };
    };
  }

  static getLimitValueValidator(value: number, limitType: 'min' | 'max'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = !control.value || (limitType === 'min' ? +control.value >= value : +control.value <= value);
      return valid ? null : { maxValue: { value: control.value } };
    };
  }

  static getPatternValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = pattern.test(control.value);
      return valid ? null : { pattern: { value: control.value } };
    };
  }

  static getEqualsToValidator(otherControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valid = control.value === otherControl.value;
      const retVal = valid ? null : { passwordsNotEqual: true };
      otherControl.setErrors(retVal);
      return retVal;
    };
  }

  static getEqualsValidator(controlName1: string, controlName2: string): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } => {
      const valid = form.controls[controlName1].value === form.controls[controlName2].value;
      const retVal = valid ? null : { [controlName1]: { passwordsNotEqual: true }, [controlName2]: { passwordsNotEqual: true } };
      return retVal;
    };
  }

  static getValidPeriodDatesValidator(otherDateControlName: string, mode: 'start' | 'end'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl = control.parent.get(otherDateControlName);
      if (!control.value || !otherControl || !otherControl.value) {
        return null;
      }
      let valid: boolean;
      // const end = control.get(dateEnd).value;
      if (mode === 'end') {
        valid = !(control.value as Date).isAfter(otherControl.value as Date);
      } else {
        valid = !(control.value as Date).isBefore(otherControl.value as Date);
      }
      return valid ? null : { datesIncorrect: { value: control.value } };
    };
  }
}
