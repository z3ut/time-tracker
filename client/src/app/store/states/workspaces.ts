import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { Workspace } from 'src/app/models/workspace';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import {
  CreateWorkspace, CreateWorkspaceSuccess, CreateWorkspaceError,
  GetWorkspace, GetWorkspaceSuccess, GetWorkspaceError,
  UpdateWorkspace, UpdateWorkspaceSuccess, UpdateWorkspaceError,
  DeleteWorkspace, DeleteWorkspaceSuccess, DeleteWorkspaceError,
  LoadUserWorkspaces, LoadUserWorkspacesSuccess, LoadUserWorkspacesError
} from '../actions/workspace';
import { LoginSuccess } from '../actions/auth';

export interface WorkspacesStateModel {
  workspaces: Workspace[];
  selectedWorkspaceId: number;
  // selectedWorkspace: Workspace;
}

@State<WorkspacesStateModel>({
  name: 'workspaces',
  defaults: {
    workspaces: [],
    selectedWorkspaceId: null,
    // selectedWorkspace: null
  }
})
export class WorkspacesState implements NgxsOnInit  {

  constructor(private workspaceService: WorkspaceService) {}

  ngxsOnInit(ctx: StateContext<WorkspacesStateModel>) { }

  @Action(CreateWorkspace)
  createProject(ctx: StateContext<WorkspacesStateModel>, action: CreateWorkspace) {
    this.workspaceService
      .createWorkspace(action.workspace)
      .subscribe(workspace => {
        const state = ctx.getState();
        ctx.patchState({
          workspaces: [...state.workspaces, workspace]
        });
        ctx.dispatch(new CreateWorkspaceSuccess(workspace));
      }, err => {
        ctx.dispatch(new CreateWorkspaceError(action.workspace));
      });
  }

  @Action(GetWorkspace)
  getProject(ctx: StateContext<WorkspacesStateModel>, action: GetWorkspace) {
    this.workspaceService
      .getWorkspace(action.id)
      .subscribe(workspace => {
        ctx.dispatch(new GetWorkspaceSuccess(workspace));
      }, err => {
        ctx.dispatch(new GetWorkspaceError(action.id));
      });
  }

  @Action(UpdateWorkspace)
  updateProject(ctx: StateContext<WorkspacesStateModel>, action: UpdateWorkspace) {
    this.workspaceService
      .updateWorkspace(action.workspace)
      .subscribe(workspace => {
        const state = ctx.getState();
        ctx.patchState({
          workspaces: state.workspaces
            .map(w => w.id === action.workspace.id ?
              action.workspace :
              w)
        });
        ctx.dispatch(new UpdateWorkspaceSuccess(workspace));
      }, err => {
        ctx.dispatch(new UpdateWorkspaceError(action.workspace));
      });
  }

  @Action(DeleteWorkspace)
  deleteProject(ctx: StateContext<WorkspacesStateModel>, action: DeleteWorkspace) {
    this.workspaceService
      .deleteWorkspace(action.id)
      .subscribe(() => {
        const state = ctx.getState();
        ctx.patchState({
          workspaces: state.workspaces
            .filter(p => p.id !== action.id)
        });
        ctx.dispatch(new DeleteWorkspaceSuccess(action.id));
      }, err => {
        ctx.dispatch(new DeleteWorkspaceError(action.id));
      });
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<WorkspacesStateModel>, action: LoginSuccess) {
    ctx.patchState({
      selectedWorkspaceId: action.user.selectedWorkspaceId
    });
    ctx.dispatch(new LoadUserWorkspaces());
  }

  @Action(LoadUserWorkspaces)
  loadMoreCurrentActivities(ctx: StateContext<WorkspacesStateModel>) {
    this.workspaceService
      .getUserWorkspaces()
      .subscribe(workspaces => {
        ctx.patchState({
          workspaces
        });
        ctx.dispatch(new LoadUserWorkspacesSuccess(workspaces));
      }, err => {
        ctx.dispatch(new LoadUserWorkspacesError());
      });
  }
}
