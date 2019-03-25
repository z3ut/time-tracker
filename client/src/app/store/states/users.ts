import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { SelectWorkspaceSuccess, LoadUserWorkspacesSuccess } from '../actions/workspace';
import { LoadWorkspaceUsers, LoadWorkspaceUsersSuccess, LoadWorkspaceUsersError } from '../actions/user';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/models/user';

export interface UsersStateModel {
  workspaceUsers: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    workspaceUsers: []
  }
})
export class UsersState implements NgxsOnInit  {

  constructor(private userService: UserService) {}

  ngxsOnInit(ctx: StateContext<UsersStateModel>) { }

  @Action(LoadWorkspaceUsers)
  loadWorkspaceUsers(ctx: StateContext<UsersStateModel>, action: LoadWorkspaceUsers) {
    this.userService
      .getWorkspaceUsers(action.workspaceId)
      .subscribe(workspaceUsers => {
        ctx.patchState({
          workspaceUsers
        });
        ctx.dispatch(new LoadWorkspaceUsersSuccess(workspaceUsers));
      }, err => {
        ctx.dispatch(new LoadWorkspaceUsersError(action.workspaceId));
      });
  }

  @Action(SelectWorkspaceSuccess)
  selectWorkspaceSuccess(ctx: StateContext<UsersStateModel>, action: SelectWorkspaceSuccess) {
    ctx.patchState({
      workspaceUsers: []
    });
    ctx.dispatch(new LoadWorkspaceUsers(action.workspace.id));
  }

  @Action(LoadUserWorkspacesSuccess)
  loadUserWorkspacesSuccess(ctx: StateContext<UsersStateModel>, action: LoadUserWorkspacesSuccess) {
    ctx.patchState({
      workspaceUsers: []
    });
    ctx.dispatch(new LoadWorkspaceUsers(action.selectedWorkspace.id));
  }
}
