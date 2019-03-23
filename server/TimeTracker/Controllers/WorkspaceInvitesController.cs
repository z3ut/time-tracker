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
    public class WorkspaceInvitesController : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService;
        private readonly IWorkspaceInviteService _workspaceInviteService;
        private readonly IMapper _mapper;

        public WorkspaceInvitesController(IWorkspaceService workspaceService,
            IWorkspaceInviteService workspaceInviteService, IMapper mapper)
        {
            _workspaceService = workspaceService;
            _workspaceInviteService = workspaceInviteService;
            _mapper = mapper;
        }

        [HttpGet]
        [ActionName("GetWorkspaceInvites")]
        [Route("api/v1/workspaces/{workspaceId}/invites")]
        public IEnumerable<WorkspaceInviteDTO> GetWorkspaceInvites(int workspaceId)
        {
            var workspaceInvites = _workspaceInviteService
                .GetWorkspaceInvites(UserId, workspaceId);
            return _mapper.Map<IEnumerable<WorkspaceInviteDTO>>(workspaceInvites);
        }

        [HttpGet]
        [ActionName("GetUserWorkspaceInvites")]
        [Route("api/v1/users/{userId}/invites")]
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

        [HttpPost]
        [ActionName("InviteUserToWorkspace")]
        [Route("api/v1/workspaces/{workspaceId}/invites")]
        public ActionResult<WorkspaceInviteDTO> InviteUserToWorkspace(
             [FromBody] WorkspaceInvite workspaceInvite, int workspaceId)
        {
            var createdWorkspaceInvite = _workspaceInviteService
                .InviteUserToWorkspace(UserId, workspaceInvite.RecipientUsername,
                    workspaceId);
            return _mapper.Map<WorkspaceInviteDTO>(createdWorkspaceInvite);
        }

        [HttpPut]
        [ActionName("AcceptWorkspaceInvite")]
        [Route("api/v1/users/{userId}/invites/{inviteId}")]
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

        [HttpDelete]
        [ActionName("DeclineWorkspaceInvite")]
        [Route("api/v1/users/{userId}/invites/{inviteId}")]
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
