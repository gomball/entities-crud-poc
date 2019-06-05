import { Injectable } from '@angular/core';
import { EntityDescription } from '../description/domain-description';
import { Entity } from '../_types/entity';

export const DOMAIN_DESCRIPTION: EntityDescription[] = [];

@Injectable()
export class DomainDescriptionService {
  static getEntityDescription(entity: Entity | string): EntityDescription {
    if (typeof entity === 'string') {
      return DOMAIN_DESCRIPTION.find((ddItem) => ddItem.entityName === entity);
    } else {
      return entity['ecp:entityDescription'];
    }
  }

  static addEntityDescription(entityDescription: EntityDescription): void {
    if (!DOMAIN_DESCRIPTION.find((ddItem) => ddItem.entityName === entityDescription.entityName)) {
      DOMAIN_DESCRIPTION.push(entityDescription);
    }
  }
}
