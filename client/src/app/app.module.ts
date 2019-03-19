import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { LoginModule } from './modules/login/login.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SharedModule } from './shared/shared.module';
import { AppState } from './store/app-state';
import { NgxsModule } from '@ngxs/store';
import { ActivitiesState } from './store/states/activities';
import { AuthState } from './store/states/auth';
import { ProjectsState } from './store/states/projects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';
import { WorkspacesState } from './store/states/workspaces';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    ActivitiesModule,
    ReportsModule,
    WorkspacesModule,
    LoginModule,
    SharedModule,
    NgxsModule.forRoot([
      AppState,
      ActivitiesState,
      ProjectsState,
      AuthState,
      WorkspacesState
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
