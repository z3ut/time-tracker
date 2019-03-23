import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceInvitesComponent } from './workspace-invites.component';

describe('WorkspaceInvitesComponent', () => {
  let component: WorkspaceInvitesComponent;
  let fixture: ComponentFixture<WorkspaceInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
