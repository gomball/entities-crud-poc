import { Type } from '@angular/core';
import { EntityDescription } from '../../../../core/domain/description/domain-description';
import { Entity } from '../../../../core/domain/_types/entity';

export abstract class BaseEntityService<T extends Entity> {
  readonly entityTypeConstructor: Type<T>;
  protected readonly entityDescription: EntityDescription;
  protected readonly emptyEntityInstance: T;

  constructor(entityTypeConstructor: Type<T>) {
    this.entityTypeConstructor = entityTypeConstructor;
    this.emptyEntityInstance = new this.entityTypeConstructor();
    this.entityDescription = this.emptyEntityInstance['ecp:entityDescription'];
  }

  fromDto(dto: any): T {
    return Object.assign(new this.entityTypeConstructor(), dto);
  }
}
