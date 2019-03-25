import { Component, Input, OnChanges } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Activity } from 'src/app/models/activity';
import { EmptyProject } from '../empty-project';

@Component({
  selector: 'app-projects-activities-stats',
  templateUrl: './projects-activities-stats.component.html',
  styleUrls: ['./projects-activities-stats.component.scss']
})
export class ProjectsActivitiesStatsComponent implements OnChanges {

  @Input() projects: Project[];
  @Input() activities: Activity[];

  activitiesStats: {
    project: Project,
    activities: Activity[],
    totalTimeSeconds: number
  }[];

  ngOnChanges() {
    if (!this.projects || !this.activities) {
      this.activitiesStats = [];
      return;
    }

    this.generateActivitiesStats();
  }

  private generateActivitiesStats() {
    const projectsWithActivities = this.projects
      .filter(p => this.activities.some(a => a.projectId === p.id));

    this.activitiesStats = projectsWithActivities.map(project => {
      const projectActivities = this.activities
        .filter(a => a.projectId === project.id);
      const totalTimeSeconds = projectActivities
        .reduce((acc, cur) => acc + cur.amountSeconds, 0);
      return {
        project,
        activities: projectActivities,
        totalTimeSeconds
      };
    });


    const emptyProjectActivities = this.activities.filter(a => !a.projectId);

    if (!emptyProjectActivities.length) {
      return;
    }

    const emptyProjectTotalTimeSeconds = emptyProjectActivities
      .reduce((acc, cur) => acc + cur.amountSeconds, 0);
    this.activitiesStats.push({
      project: EmptyProject,
      activities: emptyProjectActivities,
      totalTimeSeconds: emptyProjectTotalTimeSeconds
    });
  }
}
