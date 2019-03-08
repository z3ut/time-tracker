import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {

  @Input() projects: Project[];
  @Input() selectedProjectId: number;
  @Output() selectProject = new EventEmitter<Project>();
  @Output() createNewProject = new EventEmitter();
  @Output() deleteProject = new EventEmitter<Project>();

  isProjectsDropdownShown = false;
  emptyProject: Project = {
    id: null,
    name: 'None',
    color: '#AAAAAA',
    dateTimeCreated: null,
    userId: null
  };

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  get selectedProject() {
    if (!Array.isArray(this.projects) || !this.selectedProjectId) {
      return this.emptyProject;
    }

    return this.projects
      .find(p => p.id === this.selectedProjectId) || this.emptyProject;
  }

  toggleProjects() {
    this.isProjectsDropdownShown = !this.isProjectsDropdownShown;
  }

  @HostListener('document:click', ['$event'])
  hideProjects() {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProjectsDropdownShown = false;
    }
  }

  projectClick(project: Project) {
    this.selectProject.emit(project);
  }

  createNewProjectClick() {
    this.isProjectsDropdownShown = false;
    this.createNewProject.emit();
  }

  deleteProjectClick(project: Project) {
    const isDeleteConfirmed = confirm(`Delete project "${project.name}"?`);
    if (isDeleteConfirmed) {
      this.deleteProject.emit(project);
    }
  }
}
