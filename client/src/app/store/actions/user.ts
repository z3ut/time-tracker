import { User } from 'src/app/models/user';

export class LoadWorkspaceUsers {
  static readonly type = '[Users] LoadWorkspaceUsers';

  constructor(public workspaceId: number) {}
}

export class LoadWorkspaceUsersSuccess {
  static readonly type = '[Users] LoadWorkspaceUsersSuccess';

  constructor(public users: User[]) {}
}

export class LoadWorkspaceUsersError {
  static readonly type = '[Users] LoadWorkspaceUsersError';

  constructor(public workspaceId: number) {}
}
