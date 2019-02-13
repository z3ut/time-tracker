import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-editable-activity',
  templateUrl: './editable-activity.component.html',
  styleUrls: ['./editable-activity.component.scss']
})
export class EditableActivityComponent implements OnInit, OnChanges {

  @Input() activity: Activity;
  @Output() saveChangedActivity = new EventEmitter<Activity>();

  intervalSeconds: number;

  interval = '';
  mask = [ /\d/, /\d/, ':', /[0-5]/, /\d/, ':', /[0-5]/, /\d/ ];

  private passedActivity: Activity;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.passedActivity !== this.activity) {
      this.passedActivity = Object.assign({}, this.activity);
      this.calculateInterval();
    }
  }

  saveChanges() {
    // console.log('saveChanges');
    // this.saveChangedActivity.emit(this.activity);
    if (this.activity.dateTimeEnd !== this.passedActivity.dateTimeEnd ||
      this.activity.dateTimeStart !== this.passedActivity.dateTimeStart ||
      this.activity.title !== this.passedActivity.title) {

      console.log('need to save changes');
      this.passedActivity = Object.assign({}, this.activity);
      this.saveChangedActivity.emit(this.activity);
    }
  }

  updateTime(intervalSeconds: number) {
    if (typeof intervalSeconds !== 'number') {
      return;
    }
    this.activity.dateTimeEnd = new Date(this.activity.dateTimeStart.getTime() + intervalSeconds * 1000);
    // TODO: user mutate actions stream with debounce for saving data?
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
      this.interval = '01:22:15';
    } else {
      this.intervalSeconds = 0;
    }
  }
}
