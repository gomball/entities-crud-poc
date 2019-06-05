import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { kebabCase, get } from 'lodash';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { SettingsService } from '../../../../core/domain/services/settings.service';
import { Entity } from '../../../../core/domain/_types/entity';
import { CrossCuttingService } from '../../../../core/services/cross-cutting.service';
import { FormService } from '../../../../core/services/form.service';
import { EntityEditSidebarTab } from '../../components/entity-edit-sidebar/entity-edit-sidebar.interfaces';
import { BaseEntityEditServiceContract } from './base-entity-edit.service-contract';
import { BaseEntityService } from './base-entity.service';

export abstract class BaseEntityEditService<T extends Entity> extends BaseEntityService<T> implements BaseEntityEditServiceContract {
  private _currentEntity: T = null;
  form: FormGroup;

  get isCreateOperation(): boolean {
    return !this._currentEntity || !this._currentEntity[this.entityDescription.keyProperty];
  }

  constructor(entityTypeConstructor: Type<T>, public readonly xcs: CrossCuttingService, public readonly settingsService: SettingsService) {
    super(entityTypeConstructor);
    this.form = FormService.initialize(Object.keys(this.emptyEntityInstance));
  }

  loadForEdit$(id: string): Observable<T> {
    return (!id ? of<T>(this.emptyEntityInstance) : this.get$(id)).pipe(map((rsp: T) => (this._currentEntity = rsp)));
  }

  get$(id: string): Observable<T> {
    return this.xcs.http.odataGet$(this.entityDescription.entityName, id).pipe(map((rsp: T) => this.fromDto(rsp)));
  }

  save$(): Observable<string> {
    const entityActionUrl = this._getEntityActionUrl('Save');
    const data = <T>this.form.getRawValue();
    // once the api is fully rest use "this.xcs.http.post$" if !data.id and this.xcs.http.put$ elsewhere
    const obs$: Observable<string> = this.xcs.http.post$(entityActionUrl, data);
    return obs$.pipe(
      tap((id: string) => (this.isCreateOperation ? this._goToEdit(id) : this.form.markAsPristine())),
      tap(() => this.xcs.notification.toastSuccess('messages.itemSaved'), () => this.xcs.notification.toastError('messages.itemNotSaved'))
    );
  }

  delete$(): Observable<null> {
    const entityActionUrl = this._getEntityActionUrl('Remove');
    const data = get(<T>this.form.getRawValue(), this.entityDescription.keyProperty);
    return this.xcs.http
      .get$<null>(entityActionUrl, data)
      .pipe(
        tap(
          () => this.xcs.notification.toastSuccess('messages.itemRemoved'),
          () => this.xcs.notification.toastError('messages.itemNotRemoved')
        )
      );
  }

  resetForm(): void {
    FormService.populate(this.form, this._currentEntity);
    this.form.markAsPristine();
  }

  private _getEntityActionUrl(action: string): string {
    return `${environment.REST_API_URL}/${this.entityDescription.entityName}/${action}`;
  }

  goToList$(): Observable<boolean> {
    return this.form.pristine
      ? from(this.xcs.navigation.absoluteGoto$('/' + kebabCase(this.entityDescription.entityName), 'list'))
      : of(true);
  }

  goToTab$(tab: EntityEditSidebarTab): Observable<boolean> {
    return this.form.pristine
      ? this.xcs.navigation.absoluteGoto$(
          '/' + kebabCase(this.entityDescription.entityName),
          'edit',
          this._currentEntity[this.entityDescription.keyProperty],
          tab.route || 'form'
        )
      : of(false);
  }

  private _goToEdit(id: string): void {
    this.xcs.navigation.absoluteGoto('/' + kebabCase(this.entityDescription.entityName), 'edit', id, 'form');
  }
}
