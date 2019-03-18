using AutoMapper;
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

        public WorkspaceService(ActivityContext activityContext, IMapper mapper)
        {
            _activityContext = activityContext;
            _mapper = mapper;
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

        public void Delete(int id, int userId)
        {
            var workspace = _activityContext.Workspaces.Find(id);

            if (workspace == null)
            {
                throw new Exception("Workspace not found");
            }

            if (workspace.UserId != userId)
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var workspaceProjects = _activityContext.Projects
                .Where(p => p.WorkspaceId == id);

            var workspaceActivities = _activityContext.Activities
                .Where(a => a.WorkspaceId == id);

            var workspaceUsers = _activityContext.UserWorkspaces
                .Where(uw => uw.WorkspaceId == id);

            _activityContext.Projects.RemoveRange(workspaceProjects);
            _activityContext.Activities.RemoveRange(workspaceActivities);
            _activityContext.UserWorkspaces.RemoveRange(workspaceUsers);
            _activityContext.Workspaces.Remove(workspace);

            _activityContext.SaveChanges();
        }

        public Workspace Get(int id, int userId)
        {
            var workspace = _activityContext.Workspaces.Find(id);

            if (workspace == null)
            {
                return null;
            }

            if (workspace.UserId != userId && !_activityContext.UserWorkspaces
                .Any(uw => uw.UserId == userId && uw.WorkspaceId == id))
            {
                throw new Exception("Can't get workspace not owned by user or not participated in");
            }

            return _mapper.Map<Workspace>(workspace);
        }

        public IEnumerable<Workspace> GetUserWorkspaces(int userId)
        {
            var userWorkspaces = _activityContext.Workspaces
                .Where(p => p.UserId == userId);

            return _mapper.Map<IEnumerable<Workspace>>(userWorkspaces);
        }

        public void Update(Workspace workspace, int userId)
        {
            var workspaceDA = _activityContext.Workspaces.Find(workspace.Id);

            if (workspaceDA == null)
            {
                throw new Exception("Workspace not found");
            }

            if (workspaceDA.UserId != userId)
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            workspaceDA.Name = workspace.Name;
            workspaceDA.UserId = workspace.UserId;

            _activityContext.Workspaces.Update(workspaceDA);
            _activityContext.SaveChanges();
        }
    }
}
