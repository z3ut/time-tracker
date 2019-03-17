import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Store } from '@ngxs/store';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-create-activity-manual',
  templateUrl: './create-activity-manual.component.html',
  styleUrls: ['./create-activity-manual.component.scss']
})
export class CreateActivityManualComponent implements OnInit {

  @Input() projects: Project[];
  @Output() createActivity = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  activity: Activity;
  userId: number;

  constructor(private store: Store) { }

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.auth.user.id;

    this.generateNewActivity();
  }

  create(activity: Activity) {
    this.createActivity.emit(activity);
    this.generateNewActivity();
  }

  deleteProjectEvent(project: Project) {
    this.deleteProject.emit(project);
  }

  createNewProjectEvent() {
    this.createNewProject.emit();
  }

  private generateNewActivity() {
    this.activity = {
      userId: this.userId,
      title: '',
      dateTimeStart: new Date()
    };
  }

}
