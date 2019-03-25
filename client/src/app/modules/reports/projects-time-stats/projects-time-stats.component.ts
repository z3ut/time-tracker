import { Component, Input, OnChanges } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Activity } from 'src/app/models/activity';
import { EmptyProject } from '../empty-project';

@Component({
  selector: 'app-projects-time-stats',
  templateUrl: './projects-time-stats.component.html',
  styleUrls: ['./projects-time-stats.component.scss']
})
export class ProjectsTimeStatsComponent implements OnChanges {

  @Input() projects: Project[];
  @Input() activities: Activity[];

  projectsStats: {
    project: Project,
    totalTimeSeconds: number
  }[];

  ngOnChanges() {
    if (!this.projects || !this.activities) {
      this.projectsStats = [];
      return;
    }

    this.generateProjectsStats();
  }

  private generateProjectsStats() {
    const projectsWithActivities = this.projects
      .filter(p => this.activities.some(a => a.projectId === p.id));

    this.projectsStats = projectsWithActivities.map(project => {
      const projectActivities = this.activities
        .filter(a => a.projectId === project.id);
      const totalTimeSeconds = projectActivities
        .reduce((acc, cur) => acc + cur.amountSeconds, 0);

      return {
        project,
        totalTimeSeconds
      };
    });


    const emptyProjectActivities = this.activities.filter(a => !a.projectId);

    if (!emptyProjectActivities.length) {
      return;
    }

    const emptyProjectTotalTimeSeconds = emptyProjectActivities
      .reduce((acc, cur) => acc + cur.amountSeconds, 0);
    this.projectsStats.push({
      project: EmptyProject,
      totalTimeSeconds: emptyProjectTotalTimeSeconds
    });
  }
}
