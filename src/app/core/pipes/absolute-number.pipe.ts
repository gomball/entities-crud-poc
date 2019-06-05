import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'absolute' })
export class AbsoluteNumberPipe implements PipeTransform {
  transform(value: any): any {
    return Math.abs(value);
  }
}
