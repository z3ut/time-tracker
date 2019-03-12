import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/models/project';
import {
  CreateProject, CreateProjectSuccess, CreateProjectError,
  GetProject, GetProjectSuccess, GetProjectError,
  UpdateProject, UpdateProjectSuccess, UpdateProjectError,
  DeleteProject, DeleteProjectSuccess, DeleteProjectError,
  LoadUserProjects, LoadUserProjectsSuccess, LoadUserProjectsError
} from '../actions/project';

export interface ProjectsStateModel {
  projects: Project[];
}

@State<ProjectsStateModel>({
  name: 'projects',
  defaults: {
    projects: []
  }
})
export class ProjectsState implements NgxsOnInit  {

  constructor(private projectService: ProjectService) {}

  ngxsOnInit(ctx: StateContext<ProjectsStateModel>) {}

  @Action(CreateProject)
  createProject(ctx: StateContext<ProjectsStateModel>, action: CreateProject) {
    this.projectService
      .createProject(action.project)
      .subscribe(project => {
        const state = ctx.getState();
        ctx.patchState({
          projects: [...state.projects, project]
        });
        ctx.dispatch(new CreateProjectSuccess(project));
      }, err => {
        ctx.dispatch(new CreateProjectError(action.project));
      });
  }

  @Action(GetProject)
  getProject(ctx: StateContext<ProjectsStateModel>, action: GetProject) {
    this.projectService
      .getProject(action.id)
      .subscribe(project => {
        ctx.dispatch(new GetProjectSuccess(project));
      }, err => {
        ctx.dispatch(new GetProjectError(action.id));
      });
  }

  @Action(UpdateProject)
  updateProject(ctx: StateContext<ProjectsStateModel>, action: UpdateProject) {
    this.projectService
      .updateProject(action.project)
      .subscribe(project => {
        const state = ctx.getState();
        ctx.patchState({
          projects: state.projects
            .map(p => p.id === action.project.id ?
              action.project :
              p)
        });
        ctx.dispatch(new UpdateProjectSuccess(project));
      }, err => {
        ctx.dispatch(new UpdateProjectError(action.project));
      });
  }

  @Action(DeleteProject)
  deleteProject(ctx: StateContext<ProjectsStateModel>, action: DeleteProject) {
    this.projectService
      .deleteProject(action.id)
      .subscribe(() => {
        const state = ctx.getState();
        ctx.patchState({
          projects: state.projects
            .filter(p => p.id !== action.id)
        });
        ctx.dispatch(new DeleteProjectSuccess(action.id));
      }, err => {
        ctx.dispatch(new DeleteProjectError(action.id));
      });
  }

  @Action(LoadUserProjects)
  loadMoreCurrentActivities(ctx: StateContext<ProjectsStateModel>) {
    this.projectService
      .getUserProjects()
      .subscribe(projects => {
        ctx.patchState({
          projects
        });
        ctx.dispatch(new LoadUserProjectsSuccess(projects));
      }, err => {
        ctx.dispatch(new LoadUserProjectsError());
      });
  }
}
