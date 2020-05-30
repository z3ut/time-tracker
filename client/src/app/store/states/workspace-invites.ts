import { State, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { WorkspaceInvite } from 'src/app/models/workspace-invite';
import { WorkspaceInviteService } from 'src/app/core/services/workspace-invite.service';
import {
  GetUserWorkspaceInvites, GetUserWorkspaceInvitesSuccess, GetUserWorkspaceInvitesError,
  InviteUserToWorkspace, InviteUserToWorkspaceSuccess, InviteUserToWorkspaceError,
  AcceptInviteToWorkspace, AcceptInviteToWorkspaceSuccess, AcceptInviteToWorkspaceError,
  DeclineInviteToWorkspace, DeclineInviteToWorkspaceSuccess, DeclineInviteToWorkspaceError
} from '../actions/workspace-invite';
import { LoginSuccess } from '../actions/auth';
import { AddWorkspace } from '../actions/workspace';
import { Injectable } from '@angular/core';

export interface WorkspaceInvitesStateModel {
  workspaceInvites: WorkspaceInvite[];
}

@State<WorkspaceInvitesStateModel>({
  name: 'workspaceInvites',
  defaults: {
    workspaceInvites: []
  }
})
@Injectable()
export class WorkspaceInvitesState implements NgxsOnInit  {

  constructor(private workspaceInviteService: WorkspaceInviteService) {}

  ngxsOnInit(ctx: StateContext<WorkspaceInvitesStateModel>) { }

  @Action(GetUserWorkspaceInvites)
  getUserWorkspaceInvites(ctx: StateContext<WorkspaceInvitesStateModel>, action: GetUserWorkspaceInvites) {
    this.workspaceInviteService
      .getUserWorkspaceInvites(action.userId)
      .subscribe(workspaceInvites => {
        const userInvites = workspaceInvites || [];
        ctx.patchState({
          workspaceInvites: userInvites
        });
        ctx.dispatch(new GetUserWorkspaceInvitesSuccess(userInvites));
      }, err => {
        ctx.dispatch(new GetUserWorkspaceInvitesError(action.userId));
      });
  }

  @Action(InviteUserToWorkspace)
  inviteUserToWorkspace(ctx: StateContext<WorkspaceInvitesStateModel>, action: InviteUserToWorkspace) {
    this.workspaceInviteService
      .inviteUserToWorkspace(action.recipientUsername, action.workspaceId)
      .subscribe(workspaceInvite => {
        ctx.dispatch(new InviteUserToWorkspaceSuccess(workspaceInvite));
      }, err => {
        ctx.dispatch(new InviteUserToWorkspaceError(action.recipientUsername, action.workspaceId));
      });
  }

  @Action(AcceptInviteToWorkspace)
  acceptInviteToWorkspace(ctx: StateContext<WorkspaceInvitesStateModel>, action: AcceptInviteToWorkspace) {
    this.workspaceInviteService
      .acceptWorkspaceInvite(action.userId, action.workspaceId, action.inviteId)
      .subscribe(workspace => {
        const state = ctx.getState();
        ctx.patchState({
          workspaceInvites: state.workspaceInvites.filter(wi => wi.id !== action.inviteId)
        });
        ctx.dispatch(new AddWorkspace(workspace));
        ctx.dispatch(new AcceptInviteToWorkspaceSuccess(action.userId, action.workspaceId, action.inviteId));
      }, err => {
        ctx.dispatch(new AcceptInviteToWorkspaceError(action.userId, action.workspaceId, action.inviteId));
      });
  }

  @Action(DeclineInviteToWorkspace)
  declineInviteToWorkspace(ctx: StateContext<WorkspaceInvitesStateModel>, action: DeclineInviteToWorkspace) {
    this.workspaceInviteService
      .declineWorkspaceInvite(action.userId, action.workspaceId, action.inviteId)
      .subscribe(() => {
        const state = ctx.getState();
        ctx.patchState({
          workspaceInvites: state.workspaceInvites.filter(wi => wi.id !== action.inviteId)
        });
        ctx.dispatch(new DeclineInviteToWorkspaceSuccess(action.userId, action.workspaceId, action.inviteId));
      }, err => {
        ctx.dispatch(new DeclineInviteToWorkspaceError(action.userId, action.workspaceId, action.inviteId));
      });
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<WorkspaceInvitesStateModel>, action: LoginSuccess) {
    ctx.dispatch(new GetUserWorkspaceInvites(action.user.id));
  }
}
