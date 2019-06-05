import { EntityFilterDefinition } from '../_types/entity-filter';

export interface EntityDescription {
  entityName: string;
  keyProperty: string;
  fqdn: string;
  expandProperties?: string[];
  shortDescriptionProperty: string;
  longDescriptionProperty?: string;
  entityFilterDefinition?: EntityFilterDefinition[];
}

// export const DOMAIN_DESCRIPTION: EntityDescription[] = [];

// export function addEntityDescription(entityDescription: EntityDescription): void {
//   if (!DOMAIN_DESCRIPTION.find((ddItem) => ddItem.entityName === entityDescription.entityName)) {
//     DOMAIN_DESCRIPTION.push(entityDescription);
//   }
// }

// export function getEntityDescription(entityName: string): EntityDescription {
//   return DOMAIN_DESCRIPTION.find((ddItem) => ddItem.entityName === entityName);
// }
