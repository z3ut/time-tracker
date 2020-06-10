import { Component, OnInit, OnDestroy } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { Store, Actions, ofActionDispatched, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import {
  LoadMoreCurrentActivities, LoadMoreCurrentActivitiesSuccess, LoadMoreCurrentActivitiesError,
  CreateActivity, CreateActivitySuccess, CreateActivityError,
  UpdateActivityError, UpdateActivity,
  DeleteActivityError, DeleteActivity
} from 'src/app/store/actions/activity';
import { DeleteProject, DeleteProjectError } from 'src/app/store/actions/project';
import { ToasterService } from 'angular2-toaster';
import { ActivitiesState } from 'src/app/store/states/activities';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.scss']
})
export class CurrentActivitiesComponent implements OnInit, OnDestroy {

  constructor(private toasterService: ToasterService,
              private store: Store,
              private actions$: Actions) { }

  userId: number;
  isLoadingMore = false;
  isCreatingNewProject = false;

  private ngUnsubscribe = new Subject();

  @Select(ActivitiesState.activitiesExceptRunning) activities$: Observable<Activity>;
  @Select(state => state.app.projects.projects) projects$: Observable<Activity>;

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.auth.user.id;

    this.actions$
      .pipe(
        ofActionDispatched(LoadMoreCurrentActivitiesSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.isLoadingMore = false;
      });

    this.actions$
      .pipe(
        ofActionDispatched(LoadMoreCurrentActivitiesError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error loading more activities');
        this.isLoadingMore = false;
      });

    this.actions$
      .pipe(
        ofActionDispatched(CreateActivityError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error creating new activity');
      });


    this.actions$
      .pipe(
        ofActionDispatched(UpdateActivityError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error updating activity');
      });


    this.actions$
      .pipe(
        ofActionDispatched(DeleteActivityError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error deleting activity');
      });

    this.actions$
      .pipe(
        ofActionDispatched(DeleteProjectError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error deleting project');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  activityChanged(activity: Activity) {
    this.store.dispatch(new UpdateActivity(activity));
  }

  deleteActivity(activity: Activity) {
    this.store.dispatch(new DeleteActivity(activity.id));
  }

  loadMoreActivities() {
    const store = this.store.snapshot();
    const workspaceId = store.app.workspaces.selectedWorkspaceId;
    const userId = store.app.auth.user.id;

    this.isLoadingMore = true;
    this.store.dispatch(new LoadMoreCurrentActivities(userId, workspaceId));
  }

  createNewProjectEvent() {
    this.isCreatingNewProject = true;
  }

  deleteProject(project: Project) {
    this.store.dispatch(new DeleteProject(project.id));
  }

  closeNewProjectPopup() {
    this.isCreatingNewProject = false;
  }

  createActivity(activity: Activity) {
    this.store.dispatch(new CreateActivity(activity));
  }
}
