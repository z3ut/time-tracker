import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-editable-activity',
  templateUrl: './editable-activity.component.html',
  styleUrls: ['./editable-activity.component.scss']
})
export class EditableActivityComponent implements OnInit, OnChanges {

  @Input() activity: Activity;
  @Output() activityChanged = new EventEmitter<Activity>();

  intervalSeconds: number;

  private passedActivity: Activity;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.passedActivity = Object.assign({}, this.activity);
    this.calculateInterval();
  }

  saveChanges() {
    // console.log('saveChanges');
    // this.saveChangedActivity.emit(this.activity);
    if (this.activity.dateTimeEnd !== this.passedActivity.dateTimeEnd ||
      this.activity.dateTimeStart !== this.passedActivity.dateTimeStart ||
      this.activity.title !== this.passedActivity.title) {

      // console.log('need to save changes');
      // this.passedActivity = Object.assign({}, this.activity);
      this.activityChanged.emit(this.activity);
    }
  }

  updateTime(intervalSeconds: number) {
    if (typeof intervalSeconds !== 'number') {
      return;
    }
    this.activity.dateTimeEnd = new Date(this.activity.dateTimeStart.getTime() + intervalSeconds * 1000);
    // TODO: user mutate actions stream with debounce for saving data?
    this.saveChanges();
  }

  timeChange() {
    this.calculateInterval();
    // console.log('timeChange');
    this.saveChanges();
  }

  private calculateInterval() {
    if (this.activity && this.activity.dateTimeEnd && this.activity.dateTimeStart) {
      this.intervalSeconds = Math.floor((this.activity.dateTimeEnd.getTime() -
        this.activity.dateTimeStart.getTime()) / 1000);
    } else {
      this.intervalSeconds = 0;
    }
  }
}
