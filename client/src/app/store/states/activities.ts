import { State, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import {
  CreateActivity, CreateActivitySuccess, CreateActivityError,
  GetActivity, GetActivitySuccess, GetActivityError,
  DeleteActivitySuccess, DeleteActivityError, DeleteActivity,
  UpdateActivity, UpdateActivitySuccess, UpdateActivityError,
  LoadMoreCurrentActivities, LoadMoreCurrentActivitiesSuccess, LoadMoreCurrentActivitiesError
} from '../actions/activity';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import { DeleteProject } from '../actions/project';
import { SelectWorkspaceSuccess, LoadUserWorkspacesSuccess, LoadUserSelectedWorkspaceSuccess } from '../actions/workspace';
import { WorkspacesStateModel } from './workspaces';

export interface ActivitiesStateModel {
  currentActivities: Activity[];
  currentActivitiesLoadedFrom: Date;
  isCurrentActivitiesInited: boolean;
  isLoadingCurrentActivities: boolean;
}

@State<ActivitiesStateModel>({
  name: 'activities',
  defaults: {
    currentActivities: [],
    currentActivitiesLoadedFrom: new Date(),
    isCurrentActivitiesInited: false,
    isLoadingCurrentActivities: false
  }
})
export class ActivitiesState implements NgxsOnInit  {

  private loadCurrentActivitiesStepDays = 7;

  static runningActivity(state) {
    return state.app.activities.currentActivities.find(a => !a.dateTimeEnd);
  }

  static activitiesExceptRunning(state) {
    const runningActivity = ActivitiesState.runningActivity(state);
    return state.app.activities.currentActivities
      .filter(a => a !== runningActivity);
  }

  constructor(private store: Store, private activityService: ActivityService) {}

  ngxsOnInit(ctx: StateContext<ActivitiesStateModel>) {}

  @Action(CreateActivity)
  createActivity(ctx: StateContext<ActivitiesStateModel>, action: CreateActivity) {
    this.activityService
      .createActivity(action.activity)
      .subscribe(activity => {
        const state = ctx.getState();
        ctx.patchState({
          currentActivities: [...state.currentActivities, activity]
        });
        ctx.dispatch(new CreateActivitySuccess(activity));
      }, err => {
        ctx.dispatch(new CreateActivityError(action.activity));
      });
  }

  @Action(GetActivity)
  getActivity(ctx: StateContext<ActivitiesStateModel>, action: GetActivity) {
    this.activityService
      .getActivity(action.id)
      .subscribe(activity => {
        const state = ctx.getState();
        ctx.patchState({
          currentActivities: [...state.currentActivities, activity]
        });
        ctx.dispatch(new GetActivitySuccess(activity));
      }, err => {
        ctx.dispatch(new GetActivityError(action.id));
      });
  }

  @Action(UpdateActivity)
  updateActivity(ctx: StateContext<ActivitiesStateModel>, action: UpdateActivity) {
    this.activityService
      .updateActivity(action.activity)
      .subscribe(activity => {
        const state = ctx.getState();
        ctx.patchState({
          currentActivities: state.currentActivities
            .map(a => a.id === action.activity.id ?
              action.activity :
              a)
        });
        ctx.dispatch(new UpdateActivitySuccess(activity));
      }, err => {
        ctx.dispatch(new UpdateActivityError(action.activity));
      });
  }

  @Action(DeleteActivity)
  deleteActivity(ctx: StateContext<ActivitiesStateModel>, action: DeleteActivity) {
    this.activityService
      .deleteActivity(action.id)
      .subscribe(() => {
        const state = ctx.getState();
        ctx.patchState({
          currentActivities: state.currentActivities
            .filter(a => a.id !== action.id)
        });
        ctx.dispatch(new DeleteActivitySuccess(action.id));
      }, err => {
        ctx.dispatch(new DeleteActivityError(action.id));
      });
  }

  @Action(LoadMoreCurrentActivities)
  loadMoreCurrentActivities(ctx: StateContext<ActivitiesStateModel>, action: LoadMoreCurrentActivities) {
    const stateBeforeLoad = ctx.getState();

    if (stateBeforeLoad.isLoadingCurrentActivities) {
      return;
    }

    const dateTimeFrom = new Date(stateBeforeLoad.currentActivitiesLoadedFrom.getTime());
    dateTimeFrom.setDate(dateTimeFrom.getDate() - this.loadCurrentActivitiesStepDays);
    const dateTimeTo = new Date(stateBeforeLoad.currentActivitiesLoadedFrom.getTime());


    ctx.patchState({
      isLoadingCurrentActivities: true
    });

    this.activityService
      .getUserActivities(action.userId, dateTimeFrom, dateTimeTo, action.workspaceId)
      .subscribe(activities => {
        const state = ctx.getState();
        ctx.patchState({
          currentActivitiesLoadedFrom: dateTimeFrom,
          currentActivities: [...state.currentActivities, ...activities],
          isCurrentActivitiesInited: true,
          isLoadingCurrentActivities: false
        });
        ctx.dispatch(new LoadMoreCurrentActivitiesSuccess(activities));
      }, err => {
        ctx.patchState({ isLoadingCurrentActivities: false });
        ctx.dispatch(new LoadMoreCurrentActivitiesError(action.userId, action.workspaceId));
      });
  }

  @Action(DeleteProject)
  RemoveProject(ctx: StateContext<ActivitiesStateModel>, action: DeleteProject) {
    const state = ctx.getState();
    ctx.patchState({
      currentActivities: state.currentActivities.map(a => {
        if (a.projectId === action.id) {
          a.projectId = null;
        }
        return a;
      })
    });
  }

  @Action(SelectWorkspaceSuccess)
  selectWorkspaceSuccess(ctx: StateContext<ActivitiesStateModel>, action: SelectWorkspaceSuccess) {
    ctx.patchState({
      currentActivities: [],
      currentActivitiesLoadedFrom: new Date(),
      isCurrentActivitiesInited: false,
      isLoadingCurrentActivities: false
    });
    const state = this.store.snapshot();
    const userId = state.app.auth.user.id;
    ctx.dispatch(new LoadMoreCurrentActivities(userId, action.workspace.id));
  }

  @Action(LoadUserSelectedWorkspaceSuccess)
  loadUserWorkspacesSuccess(ctx: StateContext<ActivitiesStateModel>, action: LoadUserSelectedWorkspaceSuccess) {
    ctx.patchState({
      currentActivities: [],
      currentActivitiesLoadedFrom: new Date(),
      isCurrentActivitiesInited: false,
      isLoadingCurrentActivities: false
    });
    const state = this.store.snapshot();
    const userId = state.app.auth.user.id;
    ctx.dispatch(new LoadMoreCurrentActivities(userId, action.selectedWorkspace.id));
  }
}
