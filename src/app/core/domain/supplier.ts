import { DomainDescription } from './description/domain-description.decorator';
import { Product } from './product';
import { Entity } from './_types/entity';

@DomainDescription({
  entityName: 'Supplier',
  keyProperty: 'SupplierID',
  fqdn: 'NorthwindModel.Supplier',
  shortDescriptionProperty: 'CompanyName',
  entityFilterDefinition: [
    { field: 'CompanyName', type: 'string', operators: ['eq', 'ne'] },
    { field: 'ContanctName', type: 'string', operators: ['eq'] }
  ]
})
export class Supplier extends Entity {
  SupplierID: number;
  CompanyName: string;
  ContanctName?: string;
  ContanctTitle?: string;
  Address?: string;
  City?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  Phone?: string;
  Fax?: string;
  HomePage?: string;
  Products?: Product[];
}
