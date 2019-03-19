import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkspacesComponent } from './manage-workspaces.component';

describe('ManageWorkspacesComponent', () => {
  let component: ManageWorkspacesComponent;
  let fixture: ComponentFixture<ManageWorkspacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkspacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
