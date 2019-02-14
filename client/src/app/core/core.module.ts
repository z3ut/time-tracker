import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivityService } from './services/activity.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ActivityService,
    AuthGuard
  ]
})
export class CoreModule { }
