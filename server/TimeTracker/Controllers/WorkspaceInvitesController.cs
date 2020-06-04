using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTracker.BusinessLogic.Workspaces;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    public class WorkspaceInvitesController : ControllerBase
    {
        private readonly IWorkspaceInviteService _workspaceInviteService;
        private readonly IMapper _mapper;

        public WorkspaceInvitesController(IMapper mapper,
            IWorkspaceInviteService workspaceInviteService)
        {
            _workspaceInviteService = workspaceInviteService;
            _mapper = mapper;
        }

        [HttpGet("api/v{version:apiVersion}/workspaces/{workspaceId}/invites")]
        public IEnumerable<WorkspaceInviteDTO> GetWorkspaceInvites(int workspaceId)
        {
            var workspaceInvites = _workspaceInviteService
                .GetWorkspaceInvites(UserId, workspaceId);
            return _mapper.Map<IEnumerable<WorkspaceInviteDTO>>(workspaceInvites);
        }

        [HttpGet("api/v{version:apiVersion}/users/{userId}/invites")]
        public IEnumerable<WorkspaceInviteDTO> GetUserWorkspaceInvites(int userId)
        {
            var userWorkspaceInvites = _workspaceInviteService
                .GetUserWorkspaceInvites(UserId);
            return _mapper.Map<IEnumerable<WorkspaceInviteDTO>>(userWorkspaceInvites);
        }

        public class WorkspaceInvite
        {
            public string RecipientUsername { get; set; }
        }

        [HttpPost("api/v{version:apiVersion}/workspaces/{workspaceId}/invites")]
        public ActionResult<WorkspaceInviteDTO> InviteUserToWorkspace(
             [FromBody] WorkspaceInvite workspaceInvite, int workspaceId)
        {
            var createdWorkspaceInvite = _workspaceInviteService
                .InviteUserToWorkspace(UserId, workspaceInvite.RecipientUsername,
                    workspaceId);
            return _mapper.Map<WorkspaceInviteDTO>(createdWorkspaceInvite);
        }

        [HttpPut("api/v{version:apiVersion}/users/{userId}/invites/{inviteId}")]
        public ActionResult<WorkspaceDTO> AcceptWorkspaceInvite(int userId,
            int inviteId)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong user id");
            }

            var workspace = _workspaceInviteService
                .AcceptInviteToWorkspace(UserId, inviteId);
            return _mapper.Map<WorkspaceDTO>(workspace);
        }

        [HttpDelete("api/v{version:apiVersion}/users/{userId}/invites/{inviteId}")]
        public ActionResult DeclineWorkspaceInvite(int userId, int inviteId)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong user id");
            }

            _workspaceInviteService.DeclineInviteToWorkspace(UserId, inviteId);
            return Ok();
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}
