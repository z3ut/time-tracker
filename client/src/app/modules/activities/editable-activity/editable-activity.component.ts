import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-editable-activity',
  templateUrl: './editable-activity.component.html',
  styleUrls: ['./editable-activity.component.scss']
})
export class EditableActivityComponent implements OnChanges {

  @Input() activity: Activity;
  @Input() projects: Project[];
  @Output() activityChanged = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  intervalSeconds: number;

  private passedActivity: Activity;

  ngOnChanges() {
    this.passedActivity = Object.assign({}, this.activity);
    this.calculateInterval();
  }

  saveChanges() {
    if (this.activity.dateTimeEnd !== this.passedActivity.dateTimeEnd ||
      this.activity.dateTimeStart !== this.passedActivity.dateTimeStart ||
      this.activity.title !== this.passedActivity.title ||
      this.activity.projectId !== this.passedActivity.projectId) {

      this.activityChanged.emit(this.activity);
    }
  }

  updateTime(intervalSeconds: number) {
    if (typeof intervalSeconds !== 'number') {
      return;
    }
    this.activity.dateTimeEnd = new Date(
      this.activity.dateTimeStart.getTime() + intervalSeconds * 1000);
    this.saveChanges();
  }

  timeChange() {
    this.calculateInterval();
    this.saveChanges();
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

  private calculateInterval() {
    if (this.activity && this.activity.dateTimeEnd && this.activity.dateTimeStart) {
      this.intervalSeconds = Math.floor((this.activity.dateTimeEnd.getTime() -
        this.activity.dateTimeStart.getTime()) / 1000);
    } else {
      this.intervalSeconds = 0;
    }
    this.activity.amountSeconds = this.intervalSeconds;
  }
}
