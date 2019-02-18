import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-activities-by-day-list',
  templateUrl: './activities-by-day-list.component.html',
  styleUrls: ['./activities-by-day-list.component.scss']
})
export class ActivitiesByDayListComponent implements OnInit, OnChanges {

  @Input() activities: Activity[];
  @Output() activityChanged = new EventEmitter<Activity>();

  activitiesByDay: DayActivity[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activities) {
      if (!Array.isArray(this.activities) || !this.activities.length) {
        this.activitiesByDay = [];
        return;
      }

      const dayDates: DayDate[] = [];

      this.activities.forEach(a => {
        const dayDate = {
          year: a.dateTimeStart.getFullYear(),
          month: a.dateTimeStart.getMonth(),
          date: a.dateTimeStart.getDate()
        };

        if (!dayDates.some(dd => dd.year === dayDate.year &&
            dd.month === dayDate.month && dd.date === dayDate.date)) {
          dayDates.push(dayDate);
        }
      });

      const dayActivities: DayActivity[] = dayDates
        .sort((dd1, dd2) => {
          return dd2.year - dd1.year ||
            dd2.month - dd1.month ||
            dd2.date - dd1.date;
        })
        .map(da => ({
          dayDate: da,
          activities: this.activities
            .filter(a => this.isSameDay(a.dateTimeStart, da))
        }));

      this.activitiesByDay = dayActivities;
    }
  }

  listActivityChanged(activity: Activity) {
    this.activityChanged.emit(activity);
  }

  private isSameDay(date: Date, dayDate: DayDate): boolean {
    return date.getFullYear() === dayDate.year &&
      date.getMonth() === dayDate.month &&
      date.getDate() === dayDate.date;
  }
}

interface DayDate {
  year: number;
  month: number;
  date: number;
}

interface DayActivity {
  dayDate: DayDate;
  activities: Activity[];
}
