import { Injectable } from '@angular/core';
import { WorkspaceInvite } from 'src/app/models/workspace-invite';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Workspace } from 'src/app/models/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceInviteService {

  constructor(private http: HttpClient) { }

  getUserWorkspaceInvites(userId: number): Observable<WorkspaceInvite[]> {
    return this.http.get<WorkspaceInvite[]>(`api/v1/users/${userId}/invites`).pipe(
      map(workspaceInvites => this.extractWorkspaceInvites(workspaceInvites))
    );
  }

  inviteUserToWorkspace(recipientUsername: string, workspaceId: number): Observable<any> {
    return this.http.post(`api/v1/workspaces/${workspaceId}/invites`, {
      recipientUsername
    });
  }

  acceptWorkspaceInvite(userId: number, workspaceId: number, id: number): Observable<Workspace> {
    return this.http.put<Workspace>(`api/v1/users/${userId}/invites/${id}`, null).pipe(
      map(w => this.extractWorkspace(w))
    );
  }

  declineWorkspaceInvite(userId: number, workspaceId: number, id: number): Observable<any> {
    return this.http.delete(`api/v1/users/${userId}/invites/${id}`);
  }

  private extractWorkspaceInvites(workspacesInvites: WorkspaceInvite[]): WorkspaceInvite[] {
    return workspacesInvites.map(w => this.extractWorkspaceInvite(w));
  }

  private extractWorkspaceInvite(workspacesInvite: WorkspaceInvite): WorkspaceInvite {
    if (workspacesInvite.dateTimeCreated) {
      workspacesInvite.dateTimeCreated = new Date(workspacesInvite.dateTimeCreated);
    }

    return workspacesInvite;
  }

  private extractWorkspace(workspace: Workspace): Workspace {
    if (workspace.dateTimeCreated) {
      workspace.dateTimeCreated = new Date(workspace.dateTimeCreated);
    }

    return workspace;
  }
}
