import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentActivitiesComponent } from './current-activities/current-activities.component';

const routes: Routes = [
  { path: 'current-activities', component: CurrentActivitiesComponent },
  { path: '', redirectTo: '/current-activities', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
