import { State, StateContext, NgxsOnInit } from '@ngxs/store';

import { ActivitiesState } from './states/activities';
import { AuthState } from './states/auth';
import { ProjectsState } from './states/projects';
import { WorkspacesState } from './states/workspaces';
import { WorkspaceInvitesState } from './states/workspace-invites';
import { UsersState } from './states/users';
import { Injectable } from '@angular/core';

// tslint:disable-next-line:no-empty-interface
export interface AppStateModel {}

@State<AppStateModel>({
  name: 'app',
  defaults: {

  },
  children: [
    ActivitiesState,
    ProjectsState,
    AuthState,
    WorkspacesState,
    WorkspaceInvitesState,
    UsersState
  ]
})
@Injectable()
export class AppState implements NgxsOnInit  {

  constructor() {}

  ngxsOnInit(ctx: StateContext<AppStateModel>) { }
}
