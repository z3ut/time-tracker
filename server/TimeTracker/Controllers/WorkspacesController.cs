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
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/workspaces")]
    public class WorkspacesController : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService;
        private readonly IMapper _mapper;

        public WorkspacesController(IWorkspaceService workspaceService,
            IMapper mapper)
        {
            _workspaceService = workspaceService;
            _mapper = mapper;
        }

        [HttpPost]
        public WorkspaceDTO CreateWorkspace(WorkspaceDTO workspace)
        {
            var workspaceBL = _mapper.Map<Workspace>(workspace);
            var createdWorkspace = _workspaceService.Create(workspaceBL, UserId);
            return _mapper.Map<WorkspaceDTO>(createdWorkspace);
        }

        [HttpDelete("{workspaceId}")]
        public ActionResult DeleteWorkspace(int workspaceId)
        {
            _workspaceService.Delete(workspaceId, UserId);
            return Ok();
        }

        [HttpDelete("/api/v{version:apiVersion}/users/${userId}/workspaces/{workspaceId}")]
        public ActionResult LeaveWorkspace(int userId, int workspaceId)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong workspace id");
            }

            _workspaceService.Leave(workspaceId, UserId);
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<WorkspaceDTO>> GetUserWorkspaces()
        {
            var workspaces = _workspaceService.GetUserWorkspaces(UserId);
            return _mapper.Map<IEnumerable<WorkspaceDTO>>(workspaces).ToList();
        }

        [HttpGet("{workspaceId}")]
        public ActionResult<WorkspaceDTO> GetWorkspace(int workspaceId)
        {
            var workspace = _workspaceService.Get(workspaceId, UserId);

            if (workspace == null)
            {
                return NotFound();
            }

            return _mapper.Map<WorkspaceDTO>(workspace);
        }

        [HttpPut("{workspaceId}")]
        public ActionResult<WorkspaceDTO> UpdateWorkspace(int workspaceId,
            WorkspaceDTO workspace)
        {
            if (workspaceId != workspace.Id)
            {
                return BadRequest("Wrong workspace id");
            }

            var workspaceBL = _mapper.Map<Workspace>(workspace);
            var updatedWorkspace = _workspaceService.Update(workspaceBL, UserId);
            var updatedWorkspaceDTO = _mapper.Map<WorkspaceDTO>(updatedWorkspace);
            return updatedWorkspaceDTO;
        }

        [HttpGet("selected")]
        public ActionResult<WorkspaceDTO> GetUserSelectedWorkspace()
        {
            var workspace = _workspaceService.GetUserSelectedWorkspace(UserId);
            var workspaceDTO = _mapper.Map<WorkspaceDTO>(workspace);
            return workspaceDTO;
        }

        [HttpPut("selected/{workspaceId}")]
        public ActionResult<WorkspaceDTO> SetUserSelectedWorkspace(int workspaceId)
        {
            var workspace = _workspaceService
                .SetUserSelectedWorkspace(workspaceId, UserId);
            var workspaceDTO = _mapper.Map<WorkspaceDTO>(workspace);
            return workspaceDTO;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}
