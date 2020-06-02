import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Store } from '@ngxs/store';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent {

  @Input() projects: Project[];
  @Output() create = new EventEmitter<Activity>();
  @Output() update = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  createBy: 'timer' | 'manual' = 'timer';

  constructor(private store: Store) { }

  createActivity(activity: Activity) {
    this.create.emit(activity);
  }

  updateActivity(activity: Activity) {
    this.update.emit(activity);
  }

  deleteProjectEvent(project: Project) {
    this.deleteProject.emit(project);
  }

  createNewProjectEvent() {
    this.createNewProject.emit();
  }
}
