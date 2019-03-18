﻿using AutoMapper;
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

            projectDA.DateTimeCreated = DateTime.Now;

            _activityContext.Projects.Add(projectDA);
            _activityContext.SaveChanges();

            var insertedProject = _mapper.Map<Project>(projectDA);
            return insertedProject;
        }

        public void Delete(int id, int userId)
        {
            var project = _activityContext.Projects.Find(id);

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

        public Project Get(int id, int userId)
        {
            var project = _activityContext.Projects.Find(id);

            if (project == null)
            {
                return null;
            }

            if (project.UserId != userId)
            {
                throw new Exception("Can't get another user's project");
            }

            return _mapper.Map<Project>(project);
        }

        public IEnumerable<Project> GetUserProjects(int userId, int workspaceId)
        {
            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                workspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var userProjects = _activityContext.Projects
                .Where(p => p.UserId == userId && p.WorkspaceId == workspaceId);

            return _mapper.Map<IEnumerable<Project>>(userProjects);
        }

        public void Update(Project project, int userId)
        {
            var projectDA = _activityContext.Projects.Find(project.Id);

            if (projectDA == null)
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
                throw new Exception("Workspace doesn't belong to user");
            }

            projectDA.Name = project.Name;
            projectDA.Color = project.Color;
            projectDA.UserId = project.UserId;
            projectDA.WorkspaceId = project.WorkspaceId;

            _activityContext.Projects.Update(projectDA);
            _activityContext.SaveChanges();
        }
    }
}
