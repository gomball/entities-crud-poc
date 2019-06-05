import { TestBed, inject } from '@angular/core/testing';

import { SerializationService } from './serialization.service';

const DESERIALIZED_ARRAY_VALUE = [true, 'string', 1, new Date('2010-01-01T00:00:00.000Z')];
const SERIALIZED_ARRAY_VALUE = [true, 'string', 1, '2010-01-01T00:00:00.000Z'];

const DESERIALIZED_OBJECT_VALUE = { b: true, s: 'string', n: 1, d: new Date('2010-01-01T00:00:00.000Z') };
const SERIALIZED_OBJECT_VALUE = { b: true, s: 'string', n: 1, d: '2010-01-01T00:00:00.000Z' };

describe('SerializationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SerializationService]
    });
  });

  it('should be created', inject([SerializationService], (service: SerializationService) => {
    expect(service).toBeTruthy();
  }));

  it('should deserialize and deserialize assorted array', inject([SerializationService], (service: SerializationService) => {
    expect(SerializationService.js2json(DESERIALIZED_ARRAY_VALUE)).toEqual(SERIALIZED_ARRAY_VALUE);
    expect(SerializationService.json2js(SERIALIZED_ARRAY_VALUE)).toEqual(DESERIALIZED_ARRAY_VALUE);
  }));

  it('should deserialize and deserialize assorted object', inject([SerializationService], (service: SerializationService) => {
    expect(SerializationService.js2json(DESERIALIZED_OBJECT_VALUE)).toEqual(SERIALIZED_OBJECT_VALUE);
    expect(SerializationService.json2js(SERIALIZED_OBJECT_VALUE)).toEqual(DESERIALIZED_OBJECT_VALUE);
  }));
});
