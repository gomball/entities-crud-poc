import { DomainDescription } from './description/domain-description.decorator';
import { Product } from './product';
import { Entity } from './_types/entity';

@DomainDescription({
  entityName: 'Category',
  keyProperty: 'CategoryID',
  fqdn: 'NorthwindModel.Category',
  shortDescriptionProperty: 'CategoryName',
  entityFilterDefinition: [
    { field: 'CategoryName', type: 'string', operators: ['eq', 'ne'] },
    { field: 'Description', type: 'string', operators: ['eq'] }
  ]
})
export class Category extends Entity {
  CategoryID: number;
  CategoryName: string;
  Description?: string;
  Picture?: any;
  Products?: Product[];
}
