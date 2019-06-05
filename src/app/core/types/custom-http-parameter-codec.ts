import { HttpParameterCodec } from '@angular/common/http';
import { SerializationService } from '../services/serialization.service';

export class CustomHttpParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return key;
  }

  decodeKey(key: string): string {
    return key;
  }

  encodeValue(v: string): string {
    return SerializationService.js2json(v);
  }

  decodeValue(v: string): string {
    return SerializationService.json2js(v);
  }
}
