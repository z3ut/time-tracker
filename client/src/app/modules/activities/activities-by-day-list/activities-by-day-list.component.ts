import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { calculateActivitiesTotalTimeSeconds } from 'src/app/shared/helpers/time-calculations';

@Component({
  selector: 'app-activities-by-day-list',
  templateUrl: './activities-by-day-list.component.html',
  styleUrls: ['./activities-by-day-list.component.scss']
})
export class ActivitiesByDayListComponent implements OnInit, OnChanges {

  @Input() activities: Activity[];
  @Input() projects: Project[];
  @Output() activityChanged = new EventEmitter<Activity>();
  @Output() deleteActivity = new EventEmitter<Activity>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

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

      const activitiesByDay: DayActivity[] = dayDates
        .sort((dd1, dd2) => {
          return dd2.year - dd1.year ||
            dd2.month - dd1.month ||
            dd2.date - dd1.date;
        })
        .map(dayDate => {
          const dayActivities = this.activities
            .filter(a => this.isSameDay(a.dateTimeStart, dayDate))
            .sort((a1, a2) => a2.dateTimeStart.getTime() - a1.dateTimeStart.getTime());
          return {
            dayDate,
            totalTimeSeconds: Math.floor(
              calculateActivitiesTotalTimeSeconds(dayActivities)),
            activities: dayActivities
          };
        });

      this.activitiesByDay = activitiesByDay;
    }
  }

  listActivityChanged(activity: Activity) {
    this.activityChanged.emit(activity);
  }

  deleteActivityClick(activity: Activity) {
    this.deleteActivity.emit(activity);
  }

  createNewProjectEvent() {
    this.createNewProject.emit();
  }

  deleteProjectEvent(project: Project) {
    this.deleteProject.emit(project);
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
