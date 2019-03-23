import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss']
})
export class SummaryReportComponent implements OnInit {

  dateTimeFrom: Date;
  dateTimeTo: Date;

  activities: Activity[];

  constructor(
    private store: Store,
    private activityService: ActivityService,
    private toasterService: ToasterService,
    private spinnerService: SpinnerService) { }

  get isDateRangeSelected() {
    return this.dateTimeFrom && this.dateTimeTo;
  }

  ngOnInit() {
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

    this.activityService.getActivities(userId, this.dateTimeFrom,
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
