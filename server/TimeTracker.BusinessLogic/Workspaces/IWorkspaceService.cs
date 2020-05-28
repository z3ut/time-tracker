using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public interface IWorkspaceService
    {
        Workspace Create(Workspace workspace, int userId);
        Workspace Get(int workspaceId, int userId);
        IEnumerable<Workspace> GetUserWorkspaces(int userId);

        Workspace GetUserSelectedWorkspace(int userId);
        Workspace SetUserSelectedWorkspace(int workspaceId, int userId);

        void Update(Workspace workspace, int userId);
        void Delete(int workspaceId, int userId);
        void Leave(int workspaceId, int userId);
    }
}
