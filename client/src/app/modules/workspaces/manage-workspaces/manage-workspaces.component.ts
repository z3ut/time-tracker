import { Component, OnInit } from '@angular/core';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Workspace } from 'src/app/models/workspace';
import { WorkspacesState } from 'src/app/store/states/workspaces';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { DeleteWorkspaceSuccess, DeleteWorkspaceError, DeleteWorkspace, SelectWorkspace } from 'src/app/store/actions/workspace';

@Component({
  selector: 'app-manage-workspaces',
  templateUrl: './manage-workspaces.component.html',
  styleUrls: ['./manage-workspaces.component.scss']
})
export class ManageWorkspacesComponent implements OnInit {

  @Select(WorkspacesState.selectedWorkspace) selectedWorkspace$: Observable<Workspace>;
  @Select(state => state.app.workspaces.workspaces) workspaces$: Observable<Workspace>;

  isCreatingNewWorkspace = false;

  constructor(private toasterService: ToasterService,
              private spinnerService: SpinnerService,
              private store: Store,
              private actions$: Actions) { }

  ngOnInit() {
    this.actions$
      .pipe(ofActionDispatched(DeleteWorkspaceSuccess))
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
      });

    this.actions$
      .pipe(ofActionDispatched(DeleteWorkspaceError))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error creating workspace');
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

  createWorkspace() {
    this.isCreatingNewWorkspace = true;
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

  closeNewWorkspacePopup() {
    this.isCreatingNewWorkspace = false;
  }

}
