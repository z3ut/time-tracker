import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { Observable, timer, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ActivitiesState } from 'src/app/store/states/activities';

@Component({
  selector: 'app-create-activity-with-timer',
  templateUrl: './create-activity-with-timer.component.html',
  styleUrls: ['./create-activity-with-timer.component.scss']
})
export class CreateActivityWithTimerComponent implements OnInit {

  @Input() projects: Project[];
  @Output() createActivity = new EventEmitter<Activity>();
  @Output() updateActivity = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  dateTo: Date;
  intervalSeconds: number;
  isStarted = false;
  activity: Activity;

  @Select(ActivitiesState.runningActivity) runningActivity$: Observable<Activity>;

  private timer: Observable<number>;
  private subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit() {
    this.runningActivity$.subscribe(a => {
      this.activity = a || this.creteNewActivity();
      if (this.activity.dateTimeStart) {
        this.isStarted = true;
        this.startTimer();
      }
    });
  }

  saveChanges() {
    if (this.isStarted || (this.activity && this.activity.id)) {
      this.setActivityUserAndWorkspace(this.activity);
      this.updateActivity.emit(this.activity);
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
      this.setActivityUserAndWorkspace(this.activity);
      this.updateActivity.emit(this.activity);
      this.intervalSeconds = 0;
    } else {
      this.activity.dateTimeStart = new Date();
      this.startTimer();
      this.setActivityUserAndWorkspace(this.activity);
      this.createActivity.emit(this.activity);
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

  private creteNewActivity(): Activity {
    return {
      userId: null,
      title: '',
      dateTimeStart: null
    };
  }

  private setActivityUserAndWorkspace(activity: Activity) {
    const store = this.store.snapshot();
    activity.userId = store.app.auth.user.id;
    activity.workspaceId = store.app.workspaces.selectedWorkspaceId;
  }
}
