import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageWorkspacesComponent } from './manage-workspaces/manage-workspaces.component';
import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { WorkspaceInvitesComponent } from './workspace-invites/workspace-invites.component';

@NgModule({
  declarations: [
    ManageWorkspacesComponent,
    CreateWorkspaceComponent,
    WorkspaceListComponent,
    WorkspaceInvitesComponent
  ],
  imports: [
    CommonModule,
    WorkspacesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class WorkspacesModule { }
