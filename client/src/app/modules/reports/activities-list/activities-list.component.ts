import { Component, Input, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { calculateActivitiesTotalTimeSeconds } from 'src/app/shared/helpers/time-calculations';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnChanges {

  @Input() activities: Activity[];

  activitiesStats: {
    title: string,
    totalTimeSeconds: number
  }[];

  ngOnChanges() {
    if (!this.activities) {
      this.activitiesStats = [];
      return;
    }

    this.generateActivitiesStats();
  }

  private generateActivitiesStats() {
    const activityTitles = Array.from(new Set(this.activities.map(a => a.title)));
    this.activitiesStats = activityTitles.map(title => {
      const activitiesWithTitle = this.activities.filter(a => a.title === title);
      const totalTimeSeconds = calculateActivitiesTotalTimeSeconds(activitiesWithTitle);

      return {
        title,
        totalTimeSeconds
      };
    });
  }

}
