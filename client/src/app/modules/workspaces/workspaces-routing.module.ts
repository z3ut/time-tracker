import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ManageWorkspacesComponent } from './manage-workspaces/manage-workspaces.component';

const routes: Routes = [
  {
    path: 'manage-workspaces',
    component: ManageWorkspacesComponent,
    canActivate: [AuthGuard],

    // run auth guard after logout
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacesRoutingModule { }
