import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EntityEditSidebarTab } from '../../components/entity-edit-sidebar/entity-edit-sidebar.interfaces';

export interface BaseEntityEditServiceContract {
  // data
  isCreateOperation: boolean;

  form: FormGroup;

  resetForm(): void;

  // REST
  loadForEdit$(id: string): Observable<any>;

  get$(id: string): Observable<any>;

  save$(): Observable<string>;

  delete$(): Observable<null>;

  // navigation
  goToList$(): Observable<boolean>;

  goToTab$(tab: EntityEditSidebarTab): Observable<boolean>;
}
