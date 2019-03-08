import { State, Action, StateContext } from '@ngxs/store';
import { AppStateModel } from './app-state-model';
import { UserLogin } from './actions/user-login';
import { UserLogout } from './actions/user-logout';
import { AddActivity } from './actions/add-activity';
import { RemoveActivity } from './actions/remove-activity';
import { AddCurrentActivities } from './actions/add-current-activities';
import { AddProject } from './actions/add-project';
import { RemoveProject } from './actions/remove-project';
import { UpdateActivity } from './actions/update-activity';
import { UpdateProject } from './actions/update-project';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLogged: false,
    user: null,
    currentActivities: [],
    currentActivitiesLoadedFrom: null,
    projects: []
  }
})
export class AppState {

  @Action(AddActivity)
  addActivity(ctx: StateContext<AppStateModel>, action: AddActivity) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentActivities: [
        ...state.currentActivities,
        action.activity
      ]
    });
  }

  @Action(AddCurrentActivities)
  addCurrentActivities(ctx: StateContext<AppStateModel>, action: AddCurrentActivities) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentActivitiesLoadedFrom: action.loadedFrom,
      currentActivities: [
        ...state.currentActivities,
        ...action.activities
      ]
    });
  }

  @Action(AddProject)
  addProject(ctx: StateContext<AppStateModel>, action: AddProject) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      projects: [
        ...state.projects,
        action.project
      ]
    });
  }

  @Action(RemoveActivity)
  removeActivity(ctx: StateContext<AppStateModel>, action: RemoveActivity) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentActivities: state.currentActivities
        .filter(a => a.id !== action.activity.id)
    });
  }

  @Action(RemoveProject)
  removeProject(ctx: StateContext<AppStateModel>, action: RemoveProject) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      projects: state.projects.filter(p => p.id !== action.project.id),
      currentActivities: state.currentActivities.map(a => {
        if (a.projectId === action.project.id) {
          a.projectId = null;
        }
        return a;
      })
    });
  }

  @Action(UpdateActivity)
  updateActivity(ctx: StateContext<AppStateModel>, action: UpdateActivity) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentActivities: state.currentActivities.map(a => {
        if (a.id === action.activity.id) {
          return action.activity;
        }
        return a;
      })
    });
  }

  @Action(UpdateProject)
  updateProject(ctx: StateContext<AppStateModel>, action: UpdateProject) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      projects: state.projects.map(p => {
        if (p.id === action.project.id) {
          return action.project;
        }
        return p;
      })
    });
  }

  @Action(UserLogin)
  userLogin(ctx: StateContext<AppStateModel>, action: UserLogin) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: action.user,
      isLogged: true
    });
  }

  @Action(UserLogout)
  userLogout(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: null,
      isLogged: false
    });
  }
}
