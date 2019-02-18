import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-activities-by-day-list',
  templateUrl: './activities-by-day-list.component.html',
  styleUrls: ['./activities-by-day-list.component.scss']
})
export class ActivitiesByDayListComponent implements OnInit, OnChanges {

  @Input() activities: Activity[];
  @Output() activityChange = new EventEmitter<Activity>();

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

      const dayActivities: DayActivity[] = dayDates.map(da => ({
        dayDate: da,
        activities: this.activities
          .filter(a => this.isSameDay(a.dateTimeStart, da))
      }));

      this.activitiesByDay = dayActivities;
    }
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
