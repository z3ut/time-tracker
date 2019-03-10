import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';

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
    private activityService: ActivityService) { }

  ngOnInit() {
  }

  timeChange() {
    console.log('timeChange');
  }

  generateReport() {
    console.log('generateReport', this.dateTimeFrom, this.dateTimeTo);

    this.activityService.getActivities(this.dateTimeFrom, this.dateTimeTo)
      .subscribe(a => {
        this.activities = a;
      }, err => {
        alert(err);
      });
  }
}
