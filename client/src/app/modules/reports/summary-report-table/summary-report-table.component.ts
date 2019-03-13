import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/core/services/project.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-summary-report-table',
  templateUrl: './summary-report-table.component.html',
  styleUrls: ['./summary-report-table.component.scss']
})
export class SummaryReportTableComponent implements OnInit, OnChanges {

  @Input() activities: Activity[];

  activitesByProject: {
    project: Project,
    activities: Activity[],
    totalTimeSeconds: number
  }[];

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!Array.isArray(this.activities)) {
      this.activitesByProject = [];
      return;
    }

    this.generateActivitiesByProjects();
  }

  private generateActivitiesByProjects() {
    const store = this.store.snapshot();
    const projects: Project[] = store.app.projects.projects;

    const activitiesProjects = projects
      .filter(p => this.activities.some(a => a.projectId === p.id));

    this.activitesByProject = activitiesProjects.map(project => {
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

    const activitiesWithoutProject = this.activities
      .filter(a => typeof a.projectId !== 'number');

    if (activitiesWithoutProject.length) {
      this.activitesByProject.push({
        project: {
          name: 'No project',
          color: '#b2b5ba',
          userId: null
        },
        activities: activitiesWithoutProject,
        totalTimeSeconds: activitiesWithoutProject
          .reduce((acc, cur) => acc + cur.amountSeconds, 0)
      });
    }
  }

}
