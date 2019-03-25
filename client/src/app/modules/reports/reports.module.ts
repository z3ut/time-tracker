import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SummaryReportTableComponent } from './summary-report-table/summary-report-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsTimeStatsComponent } from './projects-time-stats/projects-time-stats.component';
import { ProjectsActivitiesStatsComponent } from './projects-activities-stats/projects-activities-stats.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';

@NgModule({
  declarations: [
    SummaryReportComponent,
    SummaryReportTableComponent,
    ProjectsTimeStatsComponent,
    ProjectsActivitiesStatsComponent,
    ActivitiesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class ReportsModule { }
