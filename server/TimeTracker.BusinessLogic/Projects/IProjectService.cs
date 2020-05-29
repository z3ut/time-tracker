using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Projects
{
    public interface IProjectService
    {
        Project Create(Project project, int userId);
        Project Get(int projectId, int userId);
        IEnumerable<Project> GetWorkspaceProjects(int userId, int workspaceId);
        Project Update(Project project, int userId);
        void Delete(int projectId, int userId);
    }
}
