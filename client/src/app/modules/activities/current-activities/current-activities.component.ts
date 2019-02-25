import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Activity } from 'src/app/models/activity';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.scss']
})
export class CurrentActivitiesComponent implements OnInit {

  constructor(private activityService: ActivityService,
              private projectService: ProjectService) { }

  activities: Activity[];
  newActivity: Activity;
  USER_ID = 2;
  loadedFrom: Date;
  isLoadingMore = false;
  isCreatingNewProject = false;

  projects: Project[];

  ngOnInit() {
    this.generateNewActivity();

    this.loadedFrom = new Date();
    this.activities = [];

    this.loadMoreActivities();
    this.updateUserProjects();
  }

  saveActivity() {
    this.activityService
      .createActivity(this.newActivity)
      .subscribe(a => {
        // this.activities = [a, ...this.activities];
        this.activities = this.activities.concat(a);
        this.generateNewActivity();
      }, err => {
        console.log('error creating new activity');
      });
  }

  activityChanged(activity: Activity) {
    this.activityService
      .updateActivity(activity)
      .subscribe(a => {
        this.activities = [...this.activities];
      }, err => {
        console.log('error updating activity');
      });
  }

  deleteActivity(activity: Activity) {
    this.activityService
      .deleteActivity(activity.id)
      .subscribe(() => {
        // this.activities = [...this.activities.filter(a => a !== activity)];
        this.activities = this.activities.filter(a => a !== activity);
      }, err => {
        console.log('error deleting activity');
      });
  }

  loadMoreActivities() {
    this.isLoadingMore = true;
    const loadedTo = new Date(this.loadedFrom.getTime());
    this.loadedFrom.setDate(this.loadedFrom.getDate() - 7);
    this.activityService.getActivities(this.loadedFrom, loadedTo)
      .subscribe(a => {
        this.isLoadingMore = false;
        // this.activities = [...this.activities, ...activities];
        this.activities = this.activities.concat(a);
      }, err => {
        console.log(err);
        this.isLoadingMore = false;
      });
  }

  createNewProjectEvent() {
    this.isCreatingNewProject = true;
  }

  newProjectCreated(project: Project) {
    console.log(project);
    this.isCreatingNewProject = false;
    this.updateUserProjects();
  }

  closeNewProjectPopup() {
    this.isCreatingNewProject = false;
  }

  private generateNewActivity() {
    this.newActivity = {
      userId: this.USER_ID,
      title: '',
      dateTimeStart: new Date()
    };
  }

  private updateUserProjects() {
    this.projectService.getUserProjects().subscribe(projects => {
      this.projects = projects;
    }, err => {
      console.log('Error while trying to load user projects');
    });
  }
}
