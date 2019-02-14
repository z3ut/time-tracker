import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentActivitiesComponent } from './current-activities/current-activities.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'current-activities',
    component: CurrentActivitiesComponent,
    canActivate: [AuthGuard],

    // run auth guard after logout
    runGuardsAndResolvers: 'always'
  },
  { path: '', redirectTo: '/current-activities', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
