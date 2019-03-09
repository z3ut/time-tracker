import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-activity-with-timer',
  templateUrl: './create-activity-with-timer.component.html',
  styleUrls: ['./create-activity-with-timer.component.scss']
})
export class CreateActivityWithTimerComponent implements OnInit, OnChanges {

  @Input() activity: Activity;
  @Input() projects: Project[];
  @Output() createActivity = new EventEmitter<Activity>();
  @Output() activityChanged = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  dateTo: Date;
  intervalSeconds: number;
  isStarted = false;

  private timer: Observable<number>;
  private subscription: Subscription;

  private passedActivity: Activity;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.passedActivity = Object.assign({}, this.activity);
  }

  saveChanges() {
    if (this.activity.dateTimeEnd !== this.passedActivity.dateTimeEnd ||
      this.activity.dateTimeStart !== this.passedActivity.dateTimeStart ||
      this.activity.title !== this.passedActivity.title ||
      this.activity.projectId !== this.passedActivity.projectId) {

      this.activityChanged.emit(this.activity);
    }
  }

  selectProject(project: Project) {
    this.activity.projectId = project && project.id;
    this.saveChanges();
  }

  createNewProjectClick() {
    this.createNewProject.emit();
  }

  deleteProjectClick(project: Project) {
    this.deleteProject.emit(project);
  }

  runClick() {
    if (this.isStarted) {
      this.activity.dateTimeEnd = new Date();
      this.stopTimer();
      this.createActivity.emit(this.activity);
      this.intervalSeconds = 0;
    } else {
      this.activity.dateTimeStart = new Date();
      this.startTimer();
    }
    this.isStarted = !this.isStarted;
  }

  private startTimer() {
    this.stopTimer();

    this.timer = timer(1000, 1000);
    this.subscription = this.timer.subscribe(() => {
      this.dateTo = new Date();
      this.intervalSeconds = Math.floor((this.dateTo.getTime() -
        this.activity.dateTimeStart.getTime()) / 1000);
    });
  }

  private stopTimer() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
