import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
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
import { AuthService } from '../core/services/auth.service';
import { ActivityService } from '../core/services/activity.service';
import { ProjectService } from '../core/services/project.service';
import { LoginSuccess } from './actions/login-success';
import { LoginFailed } from './actions/login-failed';
import { CheckIsLogged } from './actions/check-is-logged';
import { UserRegister } from './actions/user-register';
import { RegisterSuccess } from './actions/register-success';
import { RegisterFailed } from './actions/register-failed';

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
export class AppState implements NgxsOnInit  {

  constructor(private authService: AuthService,
              private activityService: ActivityService,
              private projectService: ProjectService) {}

  ngxsOnInit(ctx: StateContext<AppStateModel>) {
    ctx.dispatch(new CheckIsLogged());
  }

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

  @Action(CheckIsLogged)
  checkIsLogged(ctx: StateContext<AppStateModel>) {
    if (this.authService.isLogged) {
      const user = this.authService.getUser();
      ctx.dispatch(new LoginSuccess(user));
    }
  }

  @Action(UserLogin)
  userLogin(ctx: StateContext<AppStateModel>, action: UserLogin) {
    return this.authService
      .login({ username: action.username, password: action.password })
      .subscribe(user => {
        ctx.dispatch(new LoginSuccess(user));
      }, err => {
        ctx.dispatch(new LoginFailed());
      });
  }

  @Action(UserLogout)
  userLogout(ctx: StateContext<AppStateModel>) {
    ctx.patchState({
      user: null,
      isLogged: false
    });
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AppStateModel>, action: LoginSuccess) {
    ctx.patchState({
      user: action.user,
      isLogged: true
    });
  }

  @Action(UserRegister)
  userRegister(ctx: StateContext<AppStateModel>, action: UserRegister) {
    return this.authService
      .register({ username: action.username, password: action.password })
      .subscribe(user => {
        ctx.dispatch(new RegisterSuccess(user));
      }, err => {
        ctx.dispatch(new RegisterFailed());
      });
  }

  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<AppStateModel>, action: RegisterSuccess) {
    ctx.patchState({
      user: action.user,
      isLogged: true
    });
  }
}
