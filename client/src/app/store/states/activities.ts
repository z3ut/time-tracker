import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
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

  constructor(private activityService: ActivityService) {}

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
  loadMoreCurrentActivities(ctx: StateContext<ActivitiesStateModel>) {
    const stateBeforeLoad = ctx.getState();

    if (stateBeforeLoad.isLoadingCurrentActivities) {
      ctx.dispatch(new LoadMoreCurrentActivitiesError());
      return;
    }

    const dateTimeFrom = new Date(stateBeforeLoad.currentActivitiesLoadedFrom.getTime());
    dateTimeFrom.setDate(dateTimeFrom.getDate() - this.loadCurrentActivitiesStepDays);
    const dateTimeTo = new Date(stateBeforeLoad.currentActivitiesLoadedFrom.getTime());


    ctx.patchState({
      isLoadingCurrentActivities: true
    });

    this.activityService
      .getActivities(dateTimeFrom, dateTimeTo)
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
        ctx.dispatch(new LoadMoreCurrentActivitiesError());
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
}
