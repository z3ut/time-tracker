import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { Workspace } from 'src/app/models/workspace';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import {
  CreateWorkspace, CreateWorkspaceSuccess, CreateWorkspaceError,
  GetWorkspace, GetWorkspaceSuccess, GetWorkspaceError,
  UpdateWorkspace, UpdateWorkspaceSuccess, UpdateWorkspaceError,
  DeleteWorkspace, DeleteWorkspaceSuccess, DeleteWorkspaceError,
  LoadUserWorkspaces, LoadUserWorkspacesSuccess, LoadUserWorkspacesError, SelectWorkspace, SelectWorkspaceError, SelectWorkspaceSuccess
} from '../actions/workspace';
import { LoginSuccess } from '../actions/auth';

export interface WorkspacesStateModel {
  workspaces: Workspace[];
  selectedWorkspaceId: number;
}

@State<WorkspacesStateModel>({
  name: 'workspaces',
  defaults: {
    workspaces: [],
    selectedWorkspaceId: null
  }
})
export class WorkspacesState implements NgxsOnInit  {

  static selectedWorkspace(state) {
    return state.app.workspaces.workspaces
      .find(w => w.id === state.app.workspaces.selectedWorkspaceId);
  }

  constructor(private workspaceService: WorkspaceService) {}

  ngxsOnInit(ctx: StateContext<WorkspacesStateModel>) { }

  @Action(CreateWorkspace)
  createWorkspace(ctx: StateContext<WorkspacesStateModel>, action: CreateWorkspace) {
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
  getWorkspace(ctx: StateContext<WorkspacesStateModel>, action: GetWorkspace) {
    this.workspaceService
      .getWorkspace(action.id)
      .subscribe(workspace => {
        ctx.dispatch(new GetWorkspaceSuccess(workspace));
      }, err => {
        ctx.dispatch(new GetWorkspaceError(action.id));
      });
  }

  @Action(UpdateWorkspace)
  updateWorkspace(ctx: StateContext<WorkspacesStateModel>, action: UpdateWorkspace) {
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
  deleteWorkspace(ctx: StateContext<WorkspacesStateModel>, action: DeleteWorkspace) {
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
  LoadUserWorkspaces(ctx: StateContext<WorkspacesStateModel>) {
    this.workspaceService
      .getUserWorkspaces()
      .subscribe(workspaces => {
        ctx.patchState({
          workspaces
        });
        ctx.dispatch(new LoadUserWorkspacesSuccess(workspaces));

        const state = ctx.getState();
        const selectedWorkspace = state.workspaces
          .find(w => w.id === state.selectedWorkspaceId);
        ctx.dispatch(new SelectWorkspaceSuccess(selectedWorkspace));
      }, err => {
        ctx.dispatch(new LoadUserWorkspacesError());
      });
  }

  @Action(SelectWorkspace)
  selectWorkspace(ctx: StateContext<WorkspacesStateModel>, action: SelectWorkspace) {
    const state = ctx.getState();
    const newSelectedWorkspace = state.workspaces.find(w => w.id === action.id);
    if (!newSelectedWorkspace) {
      ctx.dispatch(new SelectWorkspaceError(action.id));
      return;
    }
    ctx.patchState({
      selectedWorkspaceId: action.id
    });
    ctx.dispatch(new SelectWorkspaceSuccess(newSelectedWorkspace));
  }
}
