import { UserInfo } from './user-info';
import { Workspace } from './workspace';

export interface WorkspaceInvite {
  id: number;
  dateTimeCreated: Date;
  inviter: UserInfo;
  recipient: UserInfo;
  workspace: Workspace;
}
