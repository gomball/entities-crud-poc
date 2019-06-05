import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum EndpointId {
  GetToken = 'assets/stubs/login.json',
  GetActiveUser = 'assets/stubs/active-user.json',
  GetWarehouse = 'Warehouse/GetActive',
  GetTenantSetting = 'TenantSetting/GetByKey',
  GetWarehouseSetting = 'WarehouseSetting/GetByKey'
}

@Injectable()
export class ApiEndpointService {
  constructor() {}

  getApiEndpoint(enpoint: EndpointId): string {
    return `${environment.REST_API_URL}/${enpoint}`;
  }

  getSearchEndpoint(entityName: string): string {
    return `${environment.SEARCH_API_URL}/${pluralize(entityName)}`;
  }
}

function pluralize(name: string): string {
  if (name === 'Person') {
    return 'People';
  }
  if (name.endsWith('y')) {
    return name.substring(0, name.length - 1) + 'ies';
  }
  if (name.endsWith('x')) {
    return name + 'es';
  }
  return name + 's';
}
