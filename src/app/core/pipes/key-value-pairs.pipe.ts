import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keyValuePairs' })
export class KeyValuePairsPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    const keyValuePairs: any[] = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keyValuePairs.push({ key: key, value: value[key] });
      }
    }
    return keyValuePairs;
  }
}
