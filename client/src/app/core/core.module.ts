import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivityService } from './services/activity.service';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ProjectService } from './services/project.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthErrorInterceptor } from './interceptors/auth-error.interceptor';

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
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
