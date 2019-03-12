import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Store } from '@ngxs/store';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  @Input() projects: Project[];
  @Output() create = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  newActivity: Activity;
  userId: number;

  createBy: 'timer' | 'manual' = 'timer';

  constructor(private store: Store) { }

  ngOnInit() {
    const store = this.store.snapshot();
    this.userId = store.app.auth.user.id;

    this.generateNewActivity();
  }

  createActivity() {
    this.create.emit(this.newActivity);
    this.generateNewActivity();
  }

  deleteProjectEvent(project: Project) {
    this.deleteProject.emit(project);
  }

  createNewProjectEvent() {
    this.createNewProject.emit();
  }

  private generateNewActivity() {
    this.newActivity = {
      userId: this.userId,
      title: '',
      dateTimeStart: new Date()
    };
  }
}
