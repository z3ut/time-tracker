using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public interface IWorkspaceService
    {
        Workspace Create(Workspace workspace, int userId);
        Workspace Get(int id, int userId);
        IEnumerable<Workspace> GetUserWorkspaces(int userId);
        void Update(Workspace workspace, int userId);
        void Delete(int id, int userId);
    }
}
