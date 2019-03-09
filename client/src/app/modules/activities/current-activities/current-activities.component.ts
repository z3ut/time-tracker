import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Activity } from 'src/app/models/activity';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/models/project';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { AddCurrentActivities } from 'src/app/store/actions/add-current-activities';
import { AddActivity } from 'src/app/store/actions/add-activity';
import { UpdateActivity } from 'src/app/store/actions/update-activity';
import { RemoveActivity } from 'src/app/store/actions/remove-activity';
import { AddProject } from 'src/app/store/actions/add-project';
import { RemoveProject } from 'src/app/store/actions/remove-project';

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.scss']
})
export class CurrentActivitiesComponent implements OnInit {

  constructor(private activityService: ActivityService,
              private projectService: ProjectService,
              private store: Store) { }

  activities$: Observable<Activity[]>;
  projects$: Observable<Project>;
  newActivity: Activity;
  userId: number;
  isLoadingMore = false;
  isCreatingNewProject = false;

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.user.id;

    this.activities$ = this.store.select(state => state.app.currentActivities);
    this.projects$ = this.store.select(state => state.app.projects);

    if (!store.app.currentActivities.length) {
      this.loadMoreActivities();
    }

    this.generateNewActivity();
    this.updateUserProjects();
  }

  saveActivity() {
    this.activityService
      .createActivity(this.newActivity)
      .subscribe(a => {
        this.store.dispatch(new AddActivity(a));
        this.generateNewActivity();
      }, err => {
        console.log('error creating new activity');
      });
  }

  activityChanged(activity: Activity) {
    this.activityService
      .updateActivity(activity)
      .subscribe(a => {
        this.store.dispatch(new UpdateActivity(activity));
      }, err => {
        console.log('error updating activity');
      });
  }

  deleteActivity(activity: Activity) {
    this.activityService
      .deleteActivity(activity.id)
      .subscribe(() => {
        this.store.dispatch(new RemoveActivity(activity));
      }, err => {
        console.log('error deleting activity');
      });
  }

  loadMoreActivities() {
    this.isLoadingMore = true;
    const store = this.store.snapshot();
    const loadedFrom = store.app.currentActivitiesLoadedFrom || new Date();
    const loadedTo = new Date(loadedFrom.getTime());
    loadedFrom.setDate(loadedFrom.getDate() - 7);
    this.activityService.getActivities(loadedFrom, loadedTo)
      .subscribe(activities => {
        this.isLoadingMore = false;
        this.store.dispatch(new AddCurrentActivities(activities, loadedFrom, loadedTo));
      }, err => {
        console.log(err);
        this.isLoadingMore = false;
      });
  }

  createNewProjectEvent() {
    this.isCreatingNewProject = true;
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id).subscribe(() => {
      this.store.dispatch(new RemoveProject(project));
    }, err => {
      console.log('error deleting project', err);
    });
  }

  newProjectCreated(project: Project) {
    this.isCreatingNewProject = false;
    this.updateUserProjects();
  }

  closeNewProjectPopup() {
    this.isCreatingNewProject = false;
  }

  createActivity(activity: Activity) {
    this.activityService
      .createActivity(activity)
      .subscribe(a => {
        this.store.dispatch(new AddActivity(a));
        this.generateNewActivity();
      }, err => {
        console.log('error creating new activity');
      });
  }

  private generateNewActivity() {
    this.newActivity = {
      userId: this.userId,
      title: '',
      dateTimeStart: new Date()
    };
  }

  private updateUserProjects() {
    this.projectService.getUserProjects().subscribe(projects => {
      this.store.dispatch(projects.map(p => new AddProject(p)));
    }, err => {
      console.log('Error while trying to load user projects');
    });
  }
}
