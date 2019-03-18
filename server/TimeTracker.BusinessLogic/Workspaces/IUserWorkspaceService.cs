using System;
using System.Collections.Generic;
using System.Text;
using TimeTracker.BusinessLogic.Activities;
using TimeTracker.BusinessLogic.Projects;

namespace TimeTracker.BusinessLogic.Workspaces
{
    public interface IUserWorkspaceService
    {
        bool IsActivityInUserWorkspaces(int activityId, int userId);
        bool IsProjectInUserWorkspaces(int projectId, int userId);
        bool IsWorkspaceInUserWorkspaces(int workspaceId, int userId);

        //void ThrowIfActivityNotInUserWorkspaces(int activityId, int userId);
        //void ThrowIfProjectNotInUserWorkspaces(int projectId, int userId);
        //void ThrowIfWorkspaceNotInUserWorkspaces(int workspaceId, int userId);
    }
}
