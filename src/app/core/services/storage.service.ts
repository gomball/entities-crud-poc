import { Injectable } from '@angular/core';
import { camelCase, isNil } from 'lodash';
import { CoreConfig } from '../types/core.config';
import { SerializationService } from './serialization.service';

export enum StorageKeys {
  QUERY_FILTER_STATES = 'StorageKeys.localQueryFilterStates',
  GRID_STATES = 'StorageKeys.localGridStates',
  SESSION_AUTH_TOKEN = 'StorageKeys.sessionAuthToken',
  SESSION_DATA = 'StorageKeys.sessionData'
}

@Injectable()
export class StorageService {
  constructor(private _coreConfig: CoreConfig) {}
  /*
   * LOCAL STORAGE
   */
  getLocalValue(key: StorageKeys): string | number | boolean {
    return this._getValue(localStorage, key);
  }

  setLocalValue(key: StorageKeys, value: string | number | boolean): void {
    this._setValue(localStorage, key, value);
  }

  getLocalObject<T>(key: StorageKeys): T {
    return this._getObject<T>(localStorage, key);
  }

  setLocalObject<T>(key: StorageKeys, value: T): void {
    this._setObject<T>(localStorage, key, value);
  }

  removeLocalItem(key: StorageKeys): void {
    this._removeItem(localStorage, key);
  }

  clearLocal(): void {
    this._clear(localStorage);
  }

  /*
   * SESSION STORAGE
   */
  getSessionValue(key: StorageKeys): string | number | boolean {
    return this._getValue(sessionStorage, key);
  }

  setSessionValue(key: StorageKeys, value: string | number | boolean): void {
    this._setValue(sessionStorage, key, value);
  }

  getSessionObject<T>(key: StorageKeys): T {
    return this._getObject<T>(sessionStorage, key);
  }

  setSessionObject<T>(key: StorageKeys, value: T): void {
    this._setObject<T>(sessionStorage, key, value);
  }

  removeSessionItem(key: StorageKeys): void {
    this._removeItem(sessionStorage, key);
  }

  clearSession(): void {
    this._clear(sessionStorage);
  }

  private _getValue(storage: Storage, key: StorageKeys): string | number | boolean {
    const value = storage.getItem(this._getContextualizedAppKey(key));
    return !isNil(value) ? SerializationService.json2js(value) : null;
  }

  private _setValue(storage: Storage, key: StorageKeys, value: string | number | boolean): void {
    storage.setItem(this._getContextualizedAppKey(key), SerializationService.js2json(value));
  }

  private _getObject<T>(storage: Storage, key: StorageKeys): T {
    const value = storage.getItem(this._getContextualizedAppKey(key));
    return !isNil(value) ? <T>SerializationService.json2js(JSON.parse(value)) : null;
  }

  private _setObject<T>(storage: Storage, key: StorageKeys, value: T): void {
    storage.setItem(this._getContextualizedAppKey(key), JSON.stringify(<T>SerializationService.js2json(value)));
  }

  private _removeItem(storage: Storage, key: StorageKeys): void {
    storage.removeItem(this._getContextualizedAppKey(key));
  }

  private _clear(storage: Storage): void {
    storage.clear();
  }

  private _getContextualizedAppKey(key: StorageKeys): string {
    return `${camelCase(this._coreConfig.appName)}.${key}`;
  }
}
