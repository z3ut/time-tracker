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

  ngOnInit() {
    this.generateNewActivity();

    const dateTimeFrom = new Date();
    dateTimeFrom.setDate(dateTimeFrom.getDate() - 7);
    const dateTimeTo = new Date();
    this.activityService.getActivities(dateTimeFrom, dateTimeTo)
      .subscribe(activities => {
        this.activities = activities;
      }, err => {
        console.log(err);
        this.isErrorLoading = true;
      });
  }

  getTimeDiff(dateFrom: Date, dateTo: Date): number {
    return (dateTo.getTime() - dateFrom.getTime());
  }

  saveActivity() {
    this.activityService
      .createActivity(this.newActivity)
      .subscribe(a => {
        this.activities.unshift(a);
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

  private generateNewActivity() {
    this.newActivity = {
      userId: this.USER_ID,
      title: '',
      dateTimeStart: new Date()
    };
  }
}
