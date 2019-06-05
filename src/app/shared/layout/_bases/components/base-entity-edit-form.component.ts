import { Entity } from '../../../../core/domain/_types/entity';
import { BaseEntityEditService } from '../services/base-entity-edit.service';

export abstract class BaseEntityEditFormComponent<T extends Entity> {
  /**
   * @description shorthand for {{entityService.form}}
   */
  protected get form() {
    return this.entityService.form;
  }
  /**
   * @description shorthand for {{entityService.form.controls}}
   */
  protected get controls() {
    return this.entityService.form.controls;
  }
  abstract setValidators(): void;

  constructor(public entityService: BaseEntityEditService<T>) {
    this.setValidators();
  }
}
