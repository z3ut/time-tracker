import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivityService } from './services/activity.service';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ActivityService,
    ProjectService,
    AuthService,
    AuthGuard
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
