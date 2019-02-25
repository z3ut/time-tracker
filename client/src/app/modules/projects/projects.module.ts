import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewProjectComponent } from './create-new-project/create-new-project.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateNewProjectComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  exports: [
    CreateNewProjectComponent
  ]
})
export class ProjectsModule { }
