import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentActivitiesComponent } from './current-activities/current-activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditableActivityComponent } from './editable-activity/editable-activity.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CurrentActivitiesComponent,
    EditableActivityComponent
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
