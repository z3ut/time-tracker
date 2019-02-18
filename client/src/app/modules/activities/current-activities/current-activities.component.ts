import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-current-activities',
  templateUrl: './current-activities.component.html',
  styleUrls: ['./current-activities.component.scss']
})
export class CurrentActivitiesComponent implements OnInit {

  constructor(private activityService: ActivityService) { }

  activities: Activity[];
  isErrorLoading = false;

  newActivity: Activity;

  USER_ID = 2;

  loadedFrom: Date;

  ngOnInit() {
    this.generateNewActivity();

    this.loadedFrom = new Date();
    this.activities = [];

    this.loadMore();
  }

  getTimeDiff(dateFrom: Date, dateTo: Date): number {
    return (dateTo.getTime() - dateFrom.getTime());
  }

  saveActivity() {
    this.activityService
      .createActivity(this.newActivity)
      .subscribe(a => {
        this.activities = [a, ...this.activities];
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
        this.activities = [...this.activities.filter(a => a !== activity)];
      }, err => {
        console.log('error deleting activity');
      });
  }

  loadMore() {
    const loadedTo = new Date(this.loadedFrom.getTime());
    this.loadedFrom.setDate(this.loadedFrom.getDate() - 7);
    this.activityService.getActivities(this.loadedFrom, loadedTo)
      .subscribe(activities => {
        this.activities = [...this.activities, ...activities];
      }, err => {
        console.log(err);
        this.isErrorLoading = true;
      });
  }

  private generateNewActivity() {
    this.newActivity = {
      userId: this.USER_ID,
      title: '',
      dateTimeStart: new Date()
    };
  }
}
