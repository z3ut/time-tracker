import { Workspace } from 'src/app/models/workspace';

export class AddWorkspace {
  static readonly type = '[Workspaces] AddWorkspace';

  constructor(public workspace: Workspace) {}
}

export class CreateWorkspace {
  static readonly type = '[Workspaces] CreateWorkspace';

  constructor(public workspace: Workspace) {}
}

export class CreateWorkspaceSuccess {
  static readonly type = '[Workspaces] CreateWorkspaceSuccess';

  constructor(public workspace: Workspace) {}
}

export class CreateWorkspaceError {
  static readonly type = '[Workspaces] CreateWorkspaceError';

  constructor(public workspace: Workspace) {}
}


export class GetWorkspace {
  static readonly type = '[Workspaces] GetWorkspace';

  constructor(public id: number) {}
}

export class GetWorkspaceSuccess {
  static readonly type = '[Workspaces] GetWorkspaceSuccess';

  constructor(public workspace: Workspace) {}
}

export class GetWorkspaceError {
  static readonly type = '[Workspaces] GetWorkspaceError';

  constructor(public id: number) {}
}


export class UpdateWorkspace {
  static readonly type = '[Workspaces] UpdateWorkspace';

  constructor(public workspace: Workspace) {}
}

export class UpdateWorkspaceSuccess {
  static readonly type = '[Workspaces] UpdateWorkspaceSuccess';

  constructor(public workspace: Workspace) {}
}

export class UpdateWorkspaceError {
  static readonly type = '[Workspaces] UpdateWorkspaceError';

  constructor(public workspace: Workspace) {}
}


export class DeleteWorkspace {
  static readonly type = '[Workspaces] DeleteWorkspace';

  constructor(public id: number) {}
}

export class DeleteWorkspaceSuccess {
  static readonly type = '[Workspaces] DeleteWorkspaceSuccess';

  constructor(public id: number) {}
}

export class DeleteWorkspaceError {
  static readonly type = '[Workspaces] DeleteWorkspaceError';

  constructor(public id: number) {}
}


export class LoadUserWorkspaces {
  static readonly type = '[Workspaces] LoadUserWorkspaces';
}

export class LoadUserWorkspacesSuccess {
  static readonly type = '[Workspaces] LoadUserWorkspacesSuccess';

  constructor(public workspaces: Workspace[]) {}
}

export class LoadUserWorkspacesError {
  static readonly type = '[Workspaces] LoadUserWorkspacesError';
}


export class LoadUserSelectedWorkspace {
  static readonly type = '[Workspaces] LoadUserSelectedWorkspace';
}

export class LoadUserSelectedWorkspaceSuccess {
  static readonly type = '[Workspaces] LoadUserSelectedWorkspaceSuccess';

  constructor(public selectedWorkspace: Workspace) {}
}

export class LoadUserSelectedWorkspaceError {
  static readonly type = '[Workspaces] LoadUserSelectedWorkspaceError';
}


export class SelectWorkspace {
  static readonly type = '[Workspaces] SelectWorkspace';

  constructor(public id: number) {}
}

export class SelectWorkspaceSuccess {
  static readonly type = '[Workspaces] SelectWorkspaceSuccess';

  constructor(public workspace: Workspace) {}
}

export class SelectWorkspaceError {
  static readonly type = '[Workspaces] SelectWorkspaceError';

  constructor(public id: number) {}
}


export class LeaveWorkspace {
  static readonly type = '[Workspaces] LeaveWorkspace';

  constructor(public userId: number, public workspaceId: number) {}
}

export class LeaveWorkspaceSuccess {
  static readonly type = '[Workspaces] LeaveWorkspaceSuccess';

  constructor(public userId: number, public workspaceId: number) {}
}

export class LeaveWorkspaceError {
  static readonly type = '[Workspaces] LeaveWorkspaceError';

  constructor(public userId: number, public workspaceId: number) {}
}
