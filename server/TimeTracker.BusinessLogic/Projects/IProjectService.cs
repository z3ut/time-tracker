using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Projects
{
    public interface IProjectService
    {
        Project Create(Project project, int userId);
        Project Get(int id, int userId);
        IEnumerable<Project> GetUserProjects(int userId, int workspaceId);
        void Update(Project project, int userId);
        void Delete(int id, int userId);
    }
}
