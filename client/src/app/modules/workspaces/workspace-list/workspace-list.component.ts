import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store, Actions, Select, ofActionDispatched } from '@ngxs/store';
import { Workspace } from 'src/app/models/workspace';
import { WorkspacesState } from 'src/app/store/states/workspaces';
import { DeleteWorkspace, DeleteWorkspaceSuccess, DeleteWorkspaceError,
  SelectWorkspace,
  LeaveWorkspace,
  LeaveWorkspaceSuccess,
  LeaveWorkspaceError
} from 'src/app/store/actions/workspace';
import { WorkspaceInviteService } from 'src/app/core/services/workspace-invite.service';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnInit {

  @Select(WorkspacesState.selectedWorkspace) selectedWorkspace$: Observable<Workspace>;
  @Select(state => state.app.workspaces.workspaces) workspaces$: Observable<Workspace>;

  isCreatingNewWorkspace = false;

  constructor(private toasterService: ToasterService,
              private spinnerService: SpinnerService,
              private store: Store,
              private actions$: Actions,
              private workspaceInviteService: WorkspaceInviteService) { }

  ngOnInit() {
    this.actions$
      .pipe(ofActionDispatched(DeleteWorkspaceSuccess))
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Workspace deleted');
      });

    this.actions$
      .pipe(ofActionDispatched(DeleteWorkspaceError))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error creating workspace');
      });

    this.actions$
      .pipe(ofActionDispatched(LeaveWorkspaceSuccess))
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
        this.toasterService.pop('success', 'Workspace leave');
      });

    this.actions$
      .pipe(ofActionDispatched(LeaveWorkspaceError))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error leaving workspace');
      });
  }

  isWorkspaceSelected(workspace: Workspace) {
    const state = this.store.snapshot();
    return workspace != null &&
      workspace.id === state.app.workspaces.selectedWorkspaceId;
  }

  isUserOwnsWorkspace(workspace: Workspace) {
    const state = this.store.snapshot();
    return workspace != null && workspace.userId === state.app.auth.user.id;
  }

  selectWorkspace(w: Workspace) {
    this.store.dispatch(new SelectWorkspace(w.id));
  }

  deleteWorkspace(w: Workspace) {
    const isDeleteConfirmed = confirm(`Delete workspace "${w.name}"?`);
    if (isDeleteConfirmed) {
      this.spinnerService.show();
      this.store.dispatch(new DeleteWorkspace(w.id));
    }
  }

  leaveWorkspace(w: Workspace) {
    const isDeleteConfirmed = confirm(`Leave workspace "${w.name}"?`);
    if (isDeleteConfirmed) {
      const state = this.store.snapshot();
      this.store.dispatch(new LeaveWorkspace(state.app.auth.user.id, w.id));
    }
  }

  inviteToWorkspace(workspace: Workspace) {
    const username = prompt('Enter username:');
    if (!username) {
      return;
    }

    this.spinnerService.show();
    this.workspaceInviteService
      .inviteUserToWorkspace(username, workspace.id)
      .subscribe(() => {
        this.spinnerService.hide();
        this.toasterService.pop('success', 'Invitation sent');
      }, err => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error inviting user to workspace');
      });
  }

}
