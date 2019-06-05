import { DomainDescriptionService } from '../services/domain-description.service';
import { EntityDescription } from './domain-description';

export function DomainDescription(description: EntityDescription): ClassDecorator {
  DomainDescriptionService.addEntityDescription(description);
  return function(target: Function) {
    Object.defineProperty(target.prototype, 'ecp:entityDescription', {
      configurable: false,
      enumerable: true,
      // writable: false,
      get: () => description
    });
    Object.defineProperty(target.prototype, '$type', {
      configurable: false,
      enumerable: true,
      // writable: false,
      get: () => description.fqdn
    });
  };
}
