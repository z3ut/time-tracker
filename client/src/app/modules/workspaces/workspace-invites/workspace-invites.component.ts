import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { WorkspaceInvite } from 'src/app/models/workspace-invite';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import {
  AcceptInviteToWorkspace, AcceptInviteToWorkspaceSuccess, AcceptInviteToWorkspaceError,
  DeclineInviteToWorkspace, DeclineInviteToWorkspaceSuccess, DeclineInviteToWorkspaceError
} from 'src/app/store/actions/workspace-invite';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-workspace-invites',
  templateUrl: './workspace-invites.component.html',
  styleUrls: ['./workspace-invites.component.scss']
})
export class WorkspaceInvitesComponent implements OnInit, OnDestroy {

  @Select(state => state.app.workspaceInvites.workspaceInvites)
  workspaceInvites$: Observable<WorkspaceInvite>;

  @Select(state => state.app.workspaceInvites.workspaceInvites.length)
  numberOfWorkspaceInvites$: Observable<WorkspaceInvite>;

  private userId: number;

  private ngUnsubscribe = new Subject();

  constructor(private store: Store,
              private actions$: Actions,
              private toasterService: ToasterService,
              private spinnerService: SpinnerService) { }

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.auth.user.id;

    this.actions$
      .pipe(
        ofActionDispatched(AcceptInviteToWorkspaceSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
        this.toasterService.pop('success', 'Invite accepted');
      });

    this.actions$
      .pipe(
        ofActionDispatched(AcceptInviteToWorkspaceError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error accepting invite');
      });


    this.actions$
      .pipe(
        ofActionDispatched(DeclineInviteToWorkspaceSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ workspace }) => {
        this.spinnerService.hide();
        this.toasterService.pop('success', 'Invite decline');
      });

    this.actions$
      .pipe(
        ofActionDispatched(DeclineInviteToWorkspaceError),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error declining invite');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
