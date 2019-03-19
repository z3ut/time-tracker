import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/models/project';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'api/v1/projects';

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project).pipe(
      map(p => this.extractProject(p))
    );
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.apiUrl, project).pipe(
      map(p => this.extractProject(p))
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.apiUrl, {
      params: {
        id: id.toString()
      }
    }).pipe(
      map(p => this.extractProject(p))
    );
  }

  getUserProjects(workspaceId: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl, {
      params: {
        workspaceId: workspaceId.toString()
      }
    }).pipe(
      map(p => this.extractProjects(p))
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl, {
      params: {
        id: id.toString()
      }
    });
  }


  private extractProjects(projects: Project[]): Project[] {
    return projects.map(a => this.extractProject(a));
  }

  private extractProject(project: Project): Project {
    if (project.dateTimeCreated) {
      project.dateTimeCreated = new Date(project.dateTimeCreated);
    }

    return project;
  }
}
