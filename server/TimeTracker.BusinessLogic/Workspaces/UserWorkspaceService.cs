using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.BusinessLogic.Activities;
using TimeTracker.BusinessLogic.Projects;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Workspaces
{
    internal class UserWorkspaceService : IUserWorkspaceService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;

        public UserWorkspaceService(ActivityContext activityContext, IMapper mapper)
        {
            _activityContext = activityContext;
            _mapper = mapper;
        }

        public bool IsActivityInUserWorkspaces(int activityId, int userId)
        {
            var activity = _activityContext.Activities.Find(activityId);

            if (activity == null)
            {
                return false;
            }

            return IsWorkspaceInUserWorkspaces(activity.WorkspaceId, userId);
        }

        public bool IsProjectInUserWorkspaces(int projectId, int userId)
        {
            var project = _activityContext.Projects.Find(projectId);

            if (project == null)
            {
                return false;
            }

            return IsWorkspaceInUserWorkspaces(project.WorkspaceId, userId);
        }

        public bool IsWorkspaceInUserWorkspaces(int workspaceId, int userId)
        {
            var userWorkspaces = GetUserWorkspaces(userId);

            return userWorkspaces.Any(w => w.Id == workspaceId);
        }

        public IEnumerable<Workspace> GetUserWorkspaces(int userId)
        {
            var userWorkspaces = _activityContext.Workspaces
                .Where(w => w.UserId == userId ||
                    _activityContext.UserWorkspaces
                        .Any(uw => uw.UserId == userId &&
                            uw.WorkspaceId == w.Id));

            return _mapper.Map<IEnumerable<Workspace>>(userWorkspaces);
        }
    }
}
