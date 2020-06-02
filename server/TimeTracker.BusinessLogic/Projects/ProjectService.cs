using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.BusinessLogic.Workspaces;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Projects
{
    internal class ProjectService : IProjectService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;
        private readonly IUserWorkspaceService _userWorkspaceService;

        public ProjectService(ActivityContext activityContext, IMapper mapper,
            IUserWorkspaceService userWorkspaceService)
        {
            _activityContext = activityContext;
            _mapper = mapper;
            _userWorkspaceService = userWorkspaceService;
        }

        public Project Create(Project project, int userId)
        {
            if (project.UserId != userId)
            {
                throw new Exception("Project doesn't belong to user");
            }

            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                project.WorkspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var projectDA = _mapper.Map<DataAccess.Models.Project>(project);

            _activityContext.Projects.Add(projectDA);
            _activityContext.SaveChanges();

            var insertedProject = _mapper.Map<Project>(projectDA);
            return insertedProject;
        }

        public void Delete(int projectId, int userId)
        {
            var project = _activityContext.Projects.Find(projectId);

            if (project == null)
            {
                throw new Exception("Project not found");
            }

            if (project.UserId != userId)
            {
                throw new Exception("Project doesn't belong to user");
            }

            var projectActivities = _activityContext.Activities
                .Where(a => a.ProjectId == project.Id);

            foreach (var p in projectActivities)
            {
                p.ProjectId = null;
            }

            _activityContext.Projects.Remove(project);
            _activityContext.SaveChanges();
        }

        public Project Get(int projectId, int userId)
        {
            var project = _activityContext.Projects.Find(projectId);

            if (project == null)
            {
                return null;
            }

            if (!_userWorkspaceService.IsProjectInUserWorkspaces(project.Id, userId))
            {
                throw new Exception("Project doesn't belong to user workspaces");
            }

            return _mapper.Map<Project>(project);
        }

        public IEnumerable<Project> GetWorkspaceProjects(int userId, int workspaceId)
        {
            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                workspaceId, userId))
            {
                throw new Exception("User doesn't have access to workspace");
            }

            var userProjects = _activityContext.Projects
                .Where(p => p.WorkspaceId == workspaceId);

            return _mapper.Map<IEnumerable<Project>>(userProjects);
        }

        public Project Update(Project project, int userId)
        {
            var savedProject = _activityContext.Projects.Find(project.Id);

            if (savedProject == null)
            {
                throw new Exception("Project not found");
            }

            if (project.UserId != userId)
            {
                throw new Exception("Project doesn't belong to user");
            }

            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                project.WorkspaceId, userId))
            {
                throw new Exception("User doesn't have access to workspace");
            }

            var newProject = _mapper.Map<DataAccess.Models.Project>(project);
            _activityContext.Entry(savedProject).CurrentValues.SetValues(newProject);

            _activityContext.SaveChanges();

            _activityContext.Entry(savedProject).Reload();

            var updatedProject = _mapper.Map<Project>(savedProject);
            return updatedProject;
        }
    }
}
