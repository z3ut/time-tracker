using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Workspaces
{
    internal class WorkspaceService : IWorkspaceService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;
        private readonly IUserWorkspaceService _userWorkspaceService;

        public WorkspaceService(ActivityContext activityContext, IMapper mapper,
            IUserWorkspaceService userWorkspaceService)
        {
            _activityContext = activityContext;
            _mapper = mapper;
            _userWorkspaceService = userWorkspaceService;
        }

        public Workspace Create(Workspace workspace, int userId)
        {
            if (workspace.UserId != userId)
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var workspaceDA = _mapper.Map<DataAccess.Models.Workspace>(workspace);

            workspaceDA.DateTimeCreated = DateTime.Now;

            _activityContext.Workspaces.Add(workspaceDA);
            _activityContext.SaveChanges();

            var insertedWorkspace = _mapper.Map<Workspace>(workspaceDA);
            return insertedWorkspace;
        }

        public void Delete(int workspaceId, int userId)
        {
            var workspace = _activityContext.Workspaces.Find(workspaceId);

            if (workspace == null)
            {
                throw new Exception("Workspace not found");
            }

            if (workspace.UserId != userId)
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var workspaceProjects = _activityContext.Projects
                .Where(p => p.WorkspaceId == workspaceId);

            var workspaceActivities = _activityContext.Activities
                .Where(a => a.WorkspaceId == workspaceId);

            var workspaceUsers = _activityContext.UserWorkspaces
                .Where(uw => uw.WorkspaceId == workspaceId);

            var workspaceInvites = _activityContext.WorkspaceInvites
                .Where(wi => wi.WorkspaceId == workspaceId);

            _activityContext.Projects.RemoveRange(workspaceProjects);
            _activityContext.Activities.RemoveRange(workspaceActivities);
            _activityContext.UserWorkspaces.RemoveRange(workspaceUsers);
            _activityContext.WorkspaceInvites.RemoveRange(workspaceInvites);
            _activityContext.Workspaces.Remove(workspace);

            _activityContext.SaveChanges();
        }

        public Workspace Get(int workspaceId, int userId)
        {
            var workspace = _activityContext.Workspaces.Find(workspaceId);

            if (workspace == null)
            {
                return null;
            }

            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(workspaceId, userId))
            {
                throw new Exception("Can't get workspace not owned by user or not participated in");
            }

            return _mapper.Map<Workspace>(workspace);
        }

        public void Leave(int workspaceId, int userId)
        {
            var workspace = _activityContext.Workspaces.Find(workspaceId);

            if (workspace == null)
            {
                throw new Exception("Workspace not found");
            }

            var user = _activityContext.Users.Find(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var userWorkspace = _activityContext.UserWorkspaces
                .FirstOrDefault(uw => uw.UserId == userId && uw.WorkspaceId == workspaceId);

            if (userWorkspace == null)
            {
                throw new Exception("User has no access to this workspace");
            }

            _activityContext.UserWorkspaces.Remove(userWorkspace);
            _activityContext.SaveChanges();
        }

        public IEnumerable<Workspace> GetUserWorkspaces(int userId)
        {
            return _userWorkspaceService.GetUserWorkspaces(userId);
        }

        public Workspace Update(Workspace workspace, int userId)
        {
            var savedWorkspace = _activityContext.Workspaces.Find(workspace.Id);

            if (savedWorkspace == null)
            {
                throw new Exception("Workspace not found");
            }

            if (savedWorkspace.UserId != userId)
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var newWorkspace = _mapper.Map<DataAccess.Models.Workspace>(workspace);
            _activityContext.Entry(savedWorkspace).CurrentValues.SetValues(newWorkspace);

            _activityContext.SaveChanges();

            _activityContext.Entry(savedWorkspace).Reload();

            var updatedWorkspace = _mapper.Map<Workspace>(savedWorkspace);
            return updatedWorkspace;
        }

        public Workspace GetUserSelectedWorkspace(int userId)
        {
            var selectedWorkspaceDA = _activityContext.UserSelectedWorkspaces
                .Include(usw => usw.Workspace)
                .First(usw => usw.UserId == userId)
                .Workspace;

            var selectedWorkspace = _mapper.Map<Workspace>(selectedWorkspaceDA);
            return selectedWorkspace;
        }

        public Workspace SetUserSelectedWorkspace(int workspaceId, int userId)
        {
            var workspaceDA = _activityContext.Workspaces.Find(workspaceId);

            if (workspaceDA == null)
            {
                throw new Exception("Workspace not found");
            }

            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(workspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var currentSelectedWorkspaceDA = _activityContext.UserSelectedWorkspaces
                .FirstOrDefault(usw => usw.UserId == userId);

            if (currentSelectedWorkspaceDA != null)
            {
                _activityContext.UserSelectedWorkspaces
                    .Remove(currentSelectedWorkspaceDA);
            }

            var selectedWorkspaceDA = new DataAccess.Models.UserSelectedWorkspace();
            selectedWorkspaceDA.UserId = userId;
            selectedWorkspaceDA.WorkspaceId = workspaceId;
            _activityContext.UserSelectedWorkspaces.Add(selectedWorkspaceDA);
            _activityContext.SaveChanges();

            var selectedWorkspace = _mapper.Map<Workspace>(workspaceDA);
            return selectedWorkspace;
        }
    }
}
