import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-workspaces',
  templateUrl: './manage-workspaces.component.html',
  styleUrls: ['./manage-workspaces.component.scss']
})
export class ManageWorkspacesComponent implements OnInit {

  isCreatingNewWorkspace = false;

  constructor() { }

  ngOnInit() {
  }

  createWorkspace() {
    this.isCreatingNewWorkspace = true;
  }

  closeNewWorkspacePopup() {
    this.isCreatingNewWorkspace = false;
  }

}
