using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.BusinessLogic.Workspaces;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [ApiController]
    public class WorkspacesController : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService;
        private readonly IWorkspaceInviteService _workspaceInviteService;
        private readonly IMapper _mapper;

        public WorkspacesController(IWorkspaceService workspaceService,
            IWorkspaceInviteService workspaceInviteService, IMapper mapper)
        {
            _workspaceService = workspaceService;
            _workspaceInviteService = workspaceInviteService;
            _mapper = mapper;
        }

        [HttpPost]
        [ActionName("CreateWorkspace")]
        [Route("api/v1/workspaces")]
        public WorkspaceDTO CreateWorkspace(WorkspaceDTO workspace)
        {
            var workspaceBL = _mapper.Map<Workspace>(workspace);
            var createdWorkspace = _workspaceService.Create(workspaceBL, UserId);
            return _mapper.Map<WorkspaceDTO>(createdWorkspace);
        }

        [HttpDelete]
        [ActionName("DeleteWorkspace")]
        [Route("api/v1/workspaces/{userId}")]
        public ActionResult DeleteWorkspace(int userId)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong user id");
            }

            _workspaceService.Delete(userId, UserId);
            return Ok();
        }

        [HttpDelete]
        [ActionName("LeaveWorkspace")]
        [Route("api/v1/workspaces/{workspaceId}")]
        public ActionResult LeaveWorkspace(int userId, int workspaceId)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong user id");
            }

            _workspaceService.Leave(workspaceId, UserId);
            return Ok();

        }

        [HttpGet]
        [ActionName("GetUserWorkspaces")]
        [Route("api/v1/workspaces")]
        public ActionResult<IEnumerable<WorkspaceDTO>> GetUserWorkspaces()
        {
            var workspaces = _workspaceService.GetUserWorkspaces(UserId);
            return _mapper.Map<IEnumerable<WorkspaceDTO>>(workspaces).ToList();
        }

        [HttpGet]
        [ActionName("GetWorkspace")]
        [Route("api/v1/workspaces/{id}")]
        public ActionResult<WorkspaceDTO> GetWorkspace(int id)
        {
            var workspace = _workspaceService.Get(id, UserId);

            if (workspace == null)
            {
                return NotFound();
            }

            return _mapper.Map<WorkspaceDTO>(workspace);
        }

        [HttpPut]
        [ActionName("UpdateWorkspace")]
        [Route("api/v1/workspaces/{id}")]
        public ActionResult<WorkspaceDTO> UpdateWorkspace(int workspaceId, WorkspaceDTO workspace)
        {
            if (workspaceId != workspace.Id)
            {
                return BadRequest("Wrong id");
            }

            var workspaceBL = _mapper.Map<Workspace>(workspace);
            _workspaceService.Update(workspaceBL, UserId);
            return workspace;
        }

        [HttpGet]
        [ActionName("GetUserSelectedWorkspace")]
        [Route("api/v1/workspaces/selected")]
        public ActionResult<WorkspaceDTO> GetUserSelectedWorkspace()
        {
            var workspace = _workspaceService.GetUserSelectedWorkspace(UserId);
            var workspaceDTO = _mapper.Map<WorkspaceDTO>(workspace);
            return workspaceDTO;
        }

        [HttpPut]
        [ActionName("SetUserSelectedWorkspace")]
        [Route("api/v1/workspaces/selected/{workspaceId}")]
        public ActionResult<WorkspaceDTO> SetUserSelectedWorkspace(int workspaceId)
        {
            var workspace = _workspaceService.SetUserSelectedWorkspace(workspaceId, UserId);
            var workspaceDTO = _mapper.Map<WorkspaceDTO>(workspace);
            return workspaceDTO;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}
