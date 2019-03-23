using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public interface IWorkspaceInviteService
    {
        IEnumerable<WorkspaceInvite> GetUserWorkspaceInvites(int userId);
        IEnumerable<WorkspaceInvite> GetWorkspaceInvites(int userId, int workspaceId);
        WorkspaceInvite InviteUserToWorkspace(int inviterId, int recipientId, int workspaceId);
        WorkspaceInvite InviteUserToWorkspace(int inviterId, string recipientUsername, int workspaceId);
        Workspace AcceptInviteToWorkspace(int userId, int workspaceInviteId);
        void DeclineInviteToWorkspace(int userId, int workspaceInviteId);
    }
}
