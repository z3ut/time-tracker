import { Injectable } from '@angular/core';
import { Workspace } from 'src/app/models/workspace';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private apiUrl = 'api/v1/workspaces';

  constructor(private http: HttpClient) { }

  createWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.post<Workspace>(this.apiUrl, workspace).pipe(
      map(w => this.extractWorkspace(w))
    );
  }

  updateWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.http.put<Workspace>(this.apiUrl, workspace).pipe(
      map(w => this.extractWorkspace(w))
    );
  }

  getWorkspace(id: number): Observable<Workspace> {
    return this.http.get<Workspace>(this.apiUrl, {
      params: {
        id: id.toString()
      }
    }).pipe(
      map(w => this.extractWorkspace(w))
    );
  }

  getUserWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.apiUrl).pipe(
      map(w => this.extractWorkspaces(w))
    );
  }

  deleteWorkspace(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl, {
      params: {
        id: id.toString()
      }
    });
  }


  private extractWorkspaces(workspaces: Workspace[]): Workspace[] {
    return workspaces.map(w => this.extractWorkspace(w));
  }

  private extractWorkspace(workspace: Workspace): Workspace {
    if (workspace.dateTimeCreated) {
      workspace.dateTimeCreated = new Date(workspace.dateTimeCreated);
    }

    return workspace;
  }
}
