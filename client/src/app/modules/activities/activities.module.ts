import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentActivitiesComponent } from './current-activities/current-activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditableActivityComponent } from './editable-activity/editable-activity.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ActivitiesByDayListComponent } from './activities-by-day-list/activities-by-day-list.component';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { CreateActivityWithTimerComponent } from './create-activity/create-activity-with-timer/create-activity-with-timer.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { CreateActivityManualComponent } from './create-activity/create-activity-manual/create-activity-manual.component';

@NgModule({
  declarations: [
    CurrentActivitiesComponent,
    EditableActivityComponent,
    ActivitiesByDayListComponent,
    ProjectSelectorComponent,
    ProjectListItemComponent,
    CreateActivityWithTimerComponent,
    CreateActivityComponent,
    CreateNewProjectComponent,
    CreateActivityManualComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class ActivitiesModule { }
