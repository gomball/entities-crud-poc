import { DomainDescription } from './description/domain-description.decorator';
import { Entity } from './_types/entity';

@DomainDescription({
  entityName: 'Employee',
  keyProperty: 'EmployeeID',
  fqdn: 'NorthwindModel.Employee',
  shortDescriptionProperty: 'Employee',
  entityFilterDefinition: [
    { field: 'FirstName', type: 'string', operators: ['eq', 'ne'] },
    { field: 'LastName', type: 'string', operators: ['eq', 'ne'] },
    { field: 'Title', type: 'string', operators: ['eq'] },
  ]
})
export class Employee extends Entity {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  Title?: string;
  TitleOfCourtesy?: string;
  BirthDate?: Date;
  HireDate?: Date;
  Address?: string;
  City?: string;
  Region?: string;
  PostalCode?: string;
  Country?: string;
  HomePhone?: string;
  Extension?: string;
  Photo?: string;
  Notes?: string;
  ReportsTo?: number;
  Employee1?: Employee;
  PhotoPath?: string;
  Employees1?: Employee[];
  Orders?: any[]; // => class Order
  Territories?: any[]; // => class Territory
}
