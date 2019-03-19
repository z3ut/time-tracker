import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { Store, Actions, ofActionDispatched, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  LoadMoreCurrentActivities, LoadMoreCurrentActivitiesSuccess, LoadMoreCurrentActivitiesError,
  CreateActivity, CreateActivitySuccess, CreateActivityError,
  UpdateActivityError, UpdateActivity,
  DeleteActivityError, DeleteActivity
} from 'src/app/store/actions/activity';
import { LoadUserProjects, DeleteProject, DeleteProjectError } from 'src/app/store/actions/project';
import { ToasterService } from 'angular2-toaster';
import { ActivitiesState } from 'src/app/store/states/activities';

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.scss']
})
export class CurrentActivitiesComponent implements OnInit {

  constructor(private toasterService: ToasterService,
              private store: Store,
              private actions$: Actions) { }

  newActivity: Activity;
  userId: number;
  workspaceId: number;
  isLoadingMore = false;
  isCreatingNewProject = false;

  @Select(ActivitiesState.activitiesExceptRunning) activities$: Observable<Activity>;
  @Select(state => state.app.projects.projects) projects$: Observable<Activity>;

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.auth.user.id;
    this.workspaceId = store.app.workspaces.selectedWorkspaceId;

    if (!store.app.activities.isCurrentActivitiesInited) {
      this.loadMoreActivities();
    }

    this.generateNewActivity();
    this.store.dispatch(new LoadUserProjects(this.workspaceId));


    this.actions$
      .pipe(ofActionDispatched(LoadMoreCurrentActivitiesSuccess))
      .subscribe(({ payload }) => {
        this.isLoadingMore = false;
      });

    this.actions$
      .pipe(ofActionDispatched(LoadMoreCurrentActivitiesError))
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error loading more activities');
        this.isLoadingMore = false;
      });


    this.actions$
      .pipe(ofActionDispatched(CreateActivitySuccess))
      .subscribe(({ payload }) => {
        this.generateNewActivity();
      });

    this.actions$
      .pipe(ofActionDispatched(CreateActivityError))
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error creating new activity');
      });


    this.actions$
      .pipe(ofActionDispatched(UpdateActivityError))
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error updating activity');
      });


    this.actions$
      .pipe(ofActionDispatched(DeleteActivityError))
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error deleting activity');
      });

    this.actions$
      .pipe(ofActionDispatched(DeleteProjectError))
      .subscribe(({ payload }) => {
        this.toasterService.pop('error', 'Error deleting project');
      });
  }

  saveActivity() {
    this.store.dispatch(new CreateActivity(this.newActivity));
  }

  activityChanged(activity: Activity) {
    this.store.dispatch(new UpdateActivity(activity));
  }

  deleteActivity(activity: Activity) {
    this.store.dispatch(new DeleteActivity(activity.id));
  }

  loadMoreActivities() {
    this.isLoadingMore = true;
    this.store.dispatch(new LoadMoreCurrentActivities(this.workspaceId));
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

  private generateNewActivity() {
    this.newActivity = {
      userId: this.userId,
      title: '',
      dateTimeStart: new Date()
    };
  }
}
