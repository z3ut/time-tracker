import { Component, Input, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-summary-report-table',
  templateUrl: './summary-report-table.component.html',
  styleUrls: ['./summary-report-table.component.scss']
})
export class SummaryReportTableComponent implements OnChanges {

  @Input() activities: Activity[];
  @Input() projects: Project[];
  @Input() users: User[];

  userStats: {
    user: User,
    activities: Activity[],
    totalTimeSeconds: number,
  }[];

  ngOnChanges() {
    if (!Array.isArray(this.activities) || !Array.isArray(this.users)) {
      this.userStats = [];
      return;
    }

    this.generateStats();
  }

  private generateStats() {
    const usersWithActivities = this.users
      .filter(u => this.activities.some(a => a.userId === u.id));

    this.userStats = usersWithActivities.map(user => {
      const userActivities = this.activities.filter(a => a.userId === user.id);
      const totalTimeSeconds = userActivities
        .reduce((acc, cur) => acc + cur.amountSeconds, 0);

      return {
        user,
        activities: userActivities,
        totalTimeSeconds
      };
    });
  }

}
