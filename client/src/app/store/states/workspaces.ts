import { State, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { Workspace } from 'src/app/models/workspace';
import { WorkspaceService } from 'src/app/core/services/workspace.service';
import {
  AddWorkspace,
  CreateWorkspace, CreateWorkspaceSuccess, CreateWorkspaceError,
  GetWorkspace, GetWorkspaceSuccess, GetWorkspaceError,
  UpdateWorkspace, UpdateWorkspaceSuccess, UpdateWorkspaceError,
  DeleteWorkspace, DeleteWorkspaceSuccess, DeleteWorkspaceError,
  LoadUserWorkspaces, LoadUserWorkspacesSuccess, LoadUserWorkspacesError,
  SelectWorkspace, SelectWorkspaceError, SelectWorkspaceSuccess,
  LeaveWorkspace, LeaveWorkspaceSuccess, LeaveWorkspaceError,
  LoadUserSelectedWorkspace, LoadUserSelectedWorkspaceError, LoadUserSelectedWorkspaceSuccess
} from '../actions/workspace';
import { LoginSuccess } from '../actions/auth';
import { Injectable } from '@angular/core';

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
@Injectable()
export class WorkspacesState implements NgxsOnInit  {

  static selectedWorkspace(state) {
    return state.app.workspaces.workspaces
      .find(w => w.id === state.app.workspaces.selectedWorkspaceId) ||
      state.app.workspaces.workspaces[0];
  }

  constructor(private store: Store, private workspaceService: WorkspaceService) {}

  ngxsOnInit(ctx: StateContext<WorkspacesStateModel>) { }

  @Action(AddWorkspace)
  addWorkspace(ctx: StateContext<WorkspacesStateModel>, action: AddWorkspace) {
    const state = ctx.getState();
    ctx.patchState({
      workspaces: [...state.workspaces, action.workspace]
    });
  }

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
    ctx.dispatch(new LoadUserWorkspaces());
    ctx.dispatch(new LoadUserSelectedWorkspace());
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
      }, err => {
        ctx.dispatch(new LoadUserWorkspacesError());
      });
  }

  @Action(LoadUserSelectedWorkspace)
  loadSelectedWorkspace(ctx: StateContext<WorkspacesStateModel>, action: LoadUserSelectedWorkspace) {
    this.workspaceService
      .getUserSelectedWorkspace()
      .subscribe(workspace => {
        ctx.patchState({
          selectedWorkspaceId: workspace.id
        });
        ctx.dispatch(new LoadUserSelectedWorkspaceSuccess(workspace));
      }, err => {
        ctx.dispatch(new LoadUserSelectedWorkspaceError());
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
    this.workspaceService.setUserSelectedWorkspace(action.id)
      .subscribe(workspace => {
        ctx.patchState({
          selectedWorkspaceId: action.id
        });
        ctx.dispatch(new SelectWorkspaceSuccess(newSelectedWorkspace));
      }, err => {
        ctx.dispatch(new SelectWorkspaceError(action.id));
      });
  }

  @Action(LeaveWorkspace)
  leaveWorkspace(ctx: StateContext<WorkspacesStateModel>, action: LeaveWorkspace) {
    this.workspaceService
      .leaveWorkspace(action.userId, action.workspaceId)
      .subscribe(() => {
        const state = ctx.getState();
        ctx.patchState({
          workspaces: state.workspaces.filter(w => w.id !== action.workspaceId)
        });
        ctx.dispatch(new LeaveWorkspaceSuccess(action.userId, action.workspaceId));
      }, err => {
        ctx.dispatch(new LeaveWorkspaceError(action.userId, action.workspaceId));
      });
  }
}
