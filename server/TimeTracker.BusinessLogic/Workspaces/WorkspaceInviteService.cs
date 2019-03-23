using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.DataAccess;
using TimeTracker.DataAccess.Models;

namespace TimeTracker.BusinessLogic.Workspaces
{
    internal class WorkspaceInviteService : IWorkspaceInviteService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;
        private readonly IUserWorkspaceService _userWorkspaceService;

        public WorkspaceInviteService(ActivityContext activityContext,
            IMapper mapper, IUserWorkspaceService userWorkspaceService)
        {
            _activityContext = activityContext;
            _mapper = mapper;
            _userWorkspaceService = userWorkspaceService;
        }

        public Workspace AcceptInviteToWorkspace(int userId, int workspaceInviteId)
        {
            var workspaceInvite = _activityContext.WorkspaceInvites
                .Find(workspaceInviteId);

            if (workspaceInvite == null)
            {
                throw new Exception("Workspace invite doesn't exist");
            }

            if (userId != workspaceInvite.RecipientId)
            {
                throw new Exception("Workspace invite doesn't addressed to this user");
            }

            var userWorkspace = new DataAccess.Models.UserWorkspace
            {
                UserId = userId,
                WorkspaceId = workspaceInvite.WorkspaceId
            };

            _activityContext.WorkspaceInvites.Remove(workspaceInvite);
            _activityContext.UserWorkspaces.Add(userWorkspace);
            _activityContext.SaveChanges();

            var workspace = _activityContext.Workspaces
                .Find(workspaceInvite.WorkspaceId);
            return _mapper.Map<Workspace>(workspace);
        }

        public void DeclineInviteToWorkspace(int userId, int workspaceInviteId)
        {
            var workspaceInvite = _activityContext.WorkspaceInvites
                .Find(workspaceInviteId);

            if (workspaceInvite == null)
            {
                throw new Exception("Workspace invite doesn't exist");
            }

            if (userId != workspaceInvite.RecipientId)
            {
                throw new Exception("Workspace invite doesn't addressed to this user");
            }

            _activityContext.WorkspaceInvites.Remove(workspaceInvite);
            _activityContext.SaveChanges();
        }

        public IEnumerable<WorkspaceInvite> GetUserWorkspaceInvites(int userId)
        {
            var userWorkspaceInvites = _activityContext.WorkspaceInvites
                .Include(wi => wi.Inviter)
                .Include(wi => wi.Recipient)
                .Include(wi => wi.Workspace)
                .Where(wi => wi.RecipientId == userId);

            return _mapper.Map<IEnumerable<WorkspaceInvite>>(userWorkspaceInvites);
        }

        public IEnumerable<WorkspaceInvite> GetWorkspaceInvites(int userId, int workspaceId)
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

            var workspaceInvites = _activityContext.WorkspaceInvites
                .Include(wi => wi.Inviter)
                .Include(wi => wi.Recipient)
                .Include(wi => wi.Workspace)
                .Where(wi => wi.WorkspaceId == workspaceId);

            return _mapper.Map<IEnumerable<WorkspaceInvite>>(workspaceInvites);
        }

        public WorkspaceInvite InviteUserToWorkspace(int inviterId,
            int recipientId, int workspaceId)
        {
            var workspace = _activityContext.Workspaces.Find(workspaceId);

            if (workspace == null)
            {
                throw new Exception("Workspace not found");
            }

            if (workspace.UserId != inviterId)
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            if (_activityContext.UserWorkspaces
                .Any(uw => uw.UserId == recipientId &&
                    uw.WorkspaceId == workspaceId))
            {
                throw new Exception("User already in workspace");
            }

            var existingWorkspaceInvite = _activityContext.WorkspaceInvites
                .FirstOrDefault(wi => wi.RecipientId == recipientId &&
                    wi.WorkspaceId == workspaceId);

            if (existingWorkspaceInvite != null)
            {
                return _mapper.Map<WorkspaceInvite>(existingWorkspaceInvite);
            }

            if (!_activityContext.Users.Any(u => u.Id == recipientId))
            {
                throw new Exception("Recipient doesn't exist");
            }

            var workspaceInvite = new DataAccess.Models.WorkspaceInvite
            {
                InviterId = inviterId,
                RecipientId = recipientId,
                WorkspaceId = workspaceId,
                DateTimeCreated = DateTime.Now
            };

            _activityContext.WorkspaceInvites.Add(workspaceInvite);
            _activityContext.SaveChanges();

            return _mapper.Map<WorkspaceInvite>(workspaceInvite);
        }

        public WorkspaceInvite InviteUserToWorkspace(int inviterId,
            string recipientUsername, int workspaceId)
        {
            var user = _activityContext.Users
                .FirstOrDefault(u => u.Username == recipientUsername);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return InviteUserToWorkspace(inviterId, user.Id, workspaceId);
        }
    }
}
