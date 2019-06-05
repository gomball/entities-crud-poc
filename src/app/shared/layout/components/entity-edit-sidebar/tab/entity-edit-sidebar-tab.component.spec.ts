import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTranslateStubModule } from '../../../../../_test-stubs/ngx-translate.module';
import { EntityEditSidebarTabComponent } from './entity-edit-sidebar-tab.component';

describe('EntityEditSidebarTabComponent', () => {
  let component: EntityEditSidebarTabComponent;
  let fixture: ComponentFixture<EntityEditSidebarTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTranslateStubModule],
      declarations: [EntityEditSidebarTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityEditSidebarTabComponent);
    component = fixture.componentInstance;
    component.tab = { id: null, initialsKey: 'TST', titleKey: 'test' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
