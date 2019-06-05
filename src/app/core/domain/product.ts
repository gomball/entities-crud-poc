import { Category } from './category';
import { DomainDescription } from './description/domain-description.decorator';
import { Supplier } from './supplier';
import { Entity } from './_types/entity';

@DomainDescription({
  entityName: 'Product',
  keyProperty: 'ProductID',
  fqdn: 'NorthwindModel.Product',
  shortDescriptionProperty: 'ProductName',
  entityFilterDefinition: [
    { field: 'ProductName', type: 'string', operators: ['eq', 'ne'] }
  ]
})
export class Product extends Entity {
  ProductID: number;
  ProductName: string;
  SupplierID: number;
  Supplier?: Supplier;
  CategoryID: number;
  Category?: Category;
  QuantityPerUnit?: number;
  UnitPrice?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued: boolean;
}
