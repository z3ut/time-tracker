import { Workspace } from 'src/app/models/workspace';
import { WorkspaceInvite } from 'src/app/models/workspace-invite';

export class GetUserWorkspaceInvites {
  static readonly type = '[Workspace Invites] GetUserWorkspaceInvites';

  constructor(public userId: number) {}
}

export class GetUserWorkspaceInvitesSuccess {
  static readonly type = '[Workspace Invites] GetUserWorkspaceInvitesSuccess';

  constructor(public workspaceInvites: WorkspaceInvite[]) {}
}

export class GetUserWorkspaceInvitesError {
  static readonly type = '[Workspace Invites] GetUserWorkspaceInvitesError';

  constructor(public userId: number) {}
}


export class InviteUserToWorkspace {
  static readonly type = '[Workspace Invites] InviteUserToWorkspace';

  constructor(public recipientUsername: string, public workspaceId: number) {}
}

export class InviteUserToWorkspaceSuccess {
  static readonly type = '[Workspace Invites] InviteUserToWorkspaceSuccess';

  constructor(public workspaceInvite: WorkspaceInvite) {}
}

export class InviteUserToWorkspaceError {
  static readonly type = '[Workspace Invites] InviteUserToWorkspaceError';

  constructor(public recipientUsername: string, public workspaceId: number) {}
}


export class AcceptInviteToWorkspace {
  static readonly type = '[Workspace Invites] AcceptInviteToWorkspace';

  constructor(public userId: number, public workspaceId: number, public inviteId: number) {}
}

export class AcceptInviteToWorkspaceSuccess {
  static readonly type = '[Workspace Invites] AcceptInviteToWorkspaceSuccess';

  constructor(public userId: number, public workspaceId: number, public inviteId: number) {}
}

export class AcceptInviteToWorkspaceError {
  static readonly type = '[Workspace Invites] AcceptInviteToWorkspaceError';

  constructor(public userId: number, public workspaceId: number, public inviteId: number) {}
}


export class DeclineInviteToWorkspace {
  static readonly type = '[Workspace Invites] DeclineInviteToWorkspace';

  constructor(public userId: number, public workspaceId: number, public inviteId: number) {}
}

export class DeclineInviteToWorkspaceSuccess {
  static readonly type = '[Workspace Invites] DeclineInviteToWorkspaceSuccess';

  constructor(public userId: number, public workspaceId: number, public inviteId: number) {}
}

export class DeclineInviteToWorkspaceError {
  static readonly type = '[Workspace Invites] DeclineInviteToWorkspaceError';

  constructor(public userId: number, public workspaceId: number, public inviteId: number) {}
}
