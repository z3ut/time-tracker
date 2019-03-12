import { State, StateContext, NgxsOnInit } from '@ngxs/store';

import { ActivitiesState } from './states/activities';
import { UserState } from './states/user';
import { ProjectsState } from './states/projects';

// tslint:disable-next-line:no-empty-interface
export interface AppStateModel {}

@State<AppStateModel>({
  name: 'app',
  defaults: {

  },
  children: [
    ActivitiesState,
    ProjectsState,
    UserState
  ]
})
export class AppState implements NgxsOnInit  {

  constructor() {}

  ngxsOnInit(ctx: StateContext<AppStateModel>) { }
}
