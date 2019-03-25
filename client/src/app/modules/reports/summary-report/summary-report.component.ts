import { Component } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store, Select } from '@ngxs/store';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent {

  dateTimeFrom: Date;
  dateTimeTo: Date;

  activities: Activity[];

  @Select(state => state.app.users.workspaceUsers) users$: Observable<User[]>;
  @Select(state => state.app.projects.projects) projects$: Observable<Project[]>;

  constructor(
    private store: Store,
    private activityService: ActivityService,
    private userService: UserService,
    private toasterService: ToasterService,
    private spinnerService: SpinnerService) { }

  get isDateRangeSelected() {
    return this.dateTimeFrom && this.dateTimeTo;
  }

  generateReport() {
    if (!this.isDateRangeSelected) {
      this.toasterService.pop('warning', 'Select date range');
      return;
    }

    const store = this.store.snapshot();
    const workspaceId = store.app.workspaces.selectedWorkspaceId;
    const userId = store.app.auth.user.id;

    this.spinnerService.show();

    this.activityService.getWorkspaceActivities(this.dateTimeFrom,
        this.dateTimeTo, workspaceId)
      .subscribe(a => {
        this.spinnerService.hide();
        this.activities = a;
      }, err => {
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error loading activities');
      });
  }
}
