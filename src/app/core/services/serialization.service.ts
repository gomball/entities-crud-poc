import { Injectable } from '@angular/core';
import 'datejs';
import * as _ from 'lodash';
import { cloneDeep } from 'lodash';


const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*/;

@Injectable()
export class SerializationService {
  static json2js(obj: any, _recursionLevel_doNotUse: number = 0): any {
    let _obj = SerializationService._manageRecursion(obj, _recursionLevel_doNotUse);
    switch (Object.prototype.toString.call(_obj)) {
      case '[object String]':
        if (ISO_DATE_REGEX.test(_obj)) {
          _obj = Date.parse(_obj); // new Date(Date.parse(obj.substr(0, 19)));
        }
        break;
      case '[object Object]':
        _.forIn(_obj, (v, k) => {
          _obj[k] = SerializationService.json2js(v, _recursionLevel_doNotUse++);
          return true;
        });
        break;
      case '[object Array]':
        _.forEach(_obj, (v, i) => {
          _obj[i] = SerializationService.json2js(v, _recursionLevel_doNotUse++);
          return true;
        });
        break;
    }
    return _obj;
  }

  static js2json(obj: any, _recursionLevel_doNotUse: number = 0): any {
    let _obj = SerializationService._manageRecursion(obj, _recursionLevel_doNotUse);
    switch (Object.prototype.toString.call(_obj)) {
      case '[object Date]':
        _obj = (<Date>_obj).toISOString(); // .toISOString();
        break;
      case '[object Object]':
        _.forIn(_obj, (v, k) => {
          _obj[k] = SerializationService.js2json(v, _recursionLevel_doNotUse++);
          return true;
        });
        break;
      case '[object Array]':
        _.forEach(_obj, (v, i) => {
          _obj[i] = SerializationService.js2json(v, _recursionLevel_doNotUse++);
          return true;
        });
        break;
    }
    return _obj;
  }

  private static _manageRecursion(obj: any, recursionLevel: number): any {
    if (recursionLevel === 0) {
      return cloneDeep(obj);
    } else {
      return obj;
    }
  }
}
