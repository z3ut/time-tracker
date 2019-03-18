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
    [Route("api/v1/[controller]")]
    [ApiController]
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

        [HttpDelete]
        public void DeleteWorkspace(int id)
        {
            _workspaceService.Delete(id, UserId);
        }

        [HttpGet]
        [ActionName("GetUserWorkspaces")]
        public IEnumerable<WorkspaceDTO> GetUserWorkspaces()
        {
            var workspaces = _workspaceService.GetUserWorkspaces(UserId);
            return _mapper.Map<IEnumerable<WorkspaceDTO>>(workspaces);
        }

        [HttpGet]
        [ActionName("GetWorkspace")]
        [Route("{id}")]
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
        public ActionResult<WorkspaceDTO> UpdateWorkspace(WorkspaceDTO workspace)
        {
            var workspaceBL = _mapper.Map<Workspace>(workspace);
            _workspaceService.Update(workspaceBL, UserId);
            return workspace;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}
