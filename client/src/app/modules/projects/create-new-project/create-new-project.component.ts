import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/models/project';
import Pickr from '@simonwep/pickr/dist/pickr.min';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss']
})
export class CreateNewProjectComponent implements OnInit {

  name = '';
  color = '#FF0000';

  @ViewChild('colorPicker') colorPicker: ElementRef;

  @Output() created = new EventEmitter<Project>();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    const pickr = Pickr.create({
      el: this.colorPicker.nativeElement,
      default: this.color,
      components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
              hex: true,
              rgba: true,
              hsla: true,
              hsva: true,
              cmyk: true,
              input: true,
              clear: true,
              save: true
          }
      }
    });

    pickr.on('save', hsvColorObject => {
      this.color = hsvColorObject.toHEX().toString();
    });
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
