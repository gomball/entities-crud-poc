import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointId } from '../../services/api-endpoint.service';
import { HttpDataService } from '../../services/http-data.service';

export enum TenantSettingKey {}

export enum WarehouseSettingKey {
  WeightUnitOfMeasureCodes
}

@Injectable()
export class SettingsService {
  constructor(private _httpDataService: HttpDataService) {}

  getFromTenant$(key: TenantSettingKey): Observable<any> {
    return this._getSetting$(EndpointId.GetTenantSetting, TenantSettingKey[key]);
  }

  getFromWarehouse$(key: WarehouseSettingKey): Observable<any> {
    return this._getSetting$(EndpointId.GetWarehouseSetting, WarehouseSettingKey[key]);
  }

  private _getSetting$(enpointId: EndpointId, key: string): Observable<any> {
    return this._httpDataService.getData$(enpointId, null, { key }).pipe(map((s: any) => s.content || s.value || s.enabled));
  }
}
