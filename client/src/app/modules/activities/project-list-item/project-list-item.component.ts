import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

  @Input() project: Project;
  @Input() isDeletable = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectClick() {
    this.select.emit();
  }

  deleteClick() {
    this.delete.emit();
  }

}
