import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss']
})
export class CreateNewProjectComponent implements OnInit {

  name = '';
  color = '';

  @Output() created = new EventEmitter<Project>();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  create() {
    if (!this.name || !this.color) {
      alert('validate input');
      return;
    }

    this.projectService.createProjecty({
      name: this.name,
      color: this.color,
      userId: 2
    }).subscribe(p => {
      this.name = '';
      this.color = '';
      this.created.emit(p);
    }, err => {
      console.log(err);
    });
  }

}
