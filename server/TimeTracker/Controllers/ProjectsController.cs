using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.BusinessLogic.Projects;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/projects")]
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public ProjectsController(IProjectService projectService,
            IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        [HttpPost]
        public ProjectDTO CreateProject(ProjectDTO project)
        {
            var projectBL = _mapper.Map<Project>(project);
            var projectCreated = _projectService.Create(projectBL, UserId);
            return _mapper.Map<ProjectDTO>(projectCreated);
        }

        [HttpDelete("{projectId}")]
        public ActionResult DeleteProject(int projectId)
        {
            _projectService.Delete(projectId, UserId);
            return Ok();
        }

        [HttpGet("/api/v{version:apiVersion}/users/{userId}/workspaces/{workspaceId}/projects")]
        public ActionResult<IEnumerable<ProjectDTO>> GetProjects(int userId,
            int workspaceId)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong user id");
            }

            var projects = _projectService.GetWorkspaceProjects(UserId, workspaceId);
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects).ToList();
        }

        [HttpGet("{projectId}")]
        public ActionResult<ProjectDTO> GetProject(int projectId)
        {
            var project = _projectService.Get(projectId, UserId);

            if (project == null)
            {
                return NotFound();
            }

            return _mapper.Map<ProjectDTO>(project); ;
        }

        [HttpPut("{projectId}")]
        public ActionResult<ProjectDTO> UpdateProject(int projectId, ProjectDTO project)
        {
            if (projectId != project.Id)
            {
                return BadRequest("Wrong project id");
            }

            var projectBL = _mapper.Map<Project>(project);
            _projectService.Update(projectBL, UserId);
            return project;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}
