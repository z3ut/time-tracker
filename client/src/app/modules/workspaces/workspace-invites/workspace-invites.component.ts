import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { WorkspaceInvite } from 'src/app/models/workspace-invite';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import {
  AcceptInviteToWorkspace, AcceptInviteToWorkspaceSuccess, AcceptInviteToWorkspaceError,
  DeclineInviteToWorkspace, DeclineInviteToWorkspaceSuccess, DeclineInviteToWorkspaceError
} from 'src/app/store/actions/workspace-invite';

@Component({
  selector: 'app-workspace-invites',
  templateUrl: './workspace-invites.component.html',
  styleUrls: ['./workspace-invites.component.scss']
})
export class WorkspaceInvitesComponent implements OnInit {

  @Select(state => state.app.workspaceInvites.workspaceInvites)
  workspaceInvites$: Observable<WorkspaceInvite>;

  @Select(state => state.app.workspaceInvites.workspaceInvites.length)
  numberOfWorkspaceInvites$: Observable<WorkspaceInvite>;

  private userId: number;

  constructor(private store: Store,
              private actions$: Actions,
              private toasterService: ToasterService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.auth.user.id;

    this.actions$
      .pipe(ofActionDispatched(AcceptInviteToWorkspaceSuccess))
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
        this.toasterService.pop('success', 'Invite accepted');
      });

    this.actions$
      .pipe(ofActionDispatched(AcceptInviteToWorkspaceError))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error accepting invite');
      });


    this.actions$
      .pipe(ofActionDispatched(DeclineInviteToWorkspaceSuccess))
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
        this.toasterService.pop('success', 'Invite decline');
      });

    this.actions$
      .pipe(ofActionDispatched(DeclineInviteToWorkspaceError))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error declining invite');
      });
  }

  acceptWorkspaceInvite(wi: WorkspaceInvite) {
    this.spinnerService.show();
    this.store.dispatch(new AcceptInviteToWorkspace(this.userId, wi.workspace.id, wi.id));
  }

  declineWorkspaceInvite(wi: WorkspaceInvite) {
    this.spinnerService.show();
    this.store.dispatch(new DeclineInviteToWorkspace(this.userId, wi.workspace.id, wi.id));
  }

}
