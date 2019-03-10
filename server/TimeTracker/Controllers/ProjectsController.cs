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
    [Route("api/v1/[controller]")]
    [ApiController]
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
        public ProjectDTO CreateActivity(ProjectDTO project)
        {
            var projectBL = _mapper.Map<Project>(project);
            var projectCreated = _projectService.Create(projectBL, UserId);
            return _mapper.Map<ProjectDTO>(projectCreated);
        }

        [HttpDelete]
        public void DeleteActivity(int id)
        {
            _projectService.Delete(id, UserId);
        }

        [HttpGet]
        [ActionName("GetProjects")]
        public IEnumerable<ProjectDTO> GetProjects()
        {
            var projects = _projectService.GetUserProjects(UserId);
            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }

        [HttpGet]
        [ActionName("GetActivity")]
        [Route("{id}")]
        public ActionResult<ProjectDTO> GetActivity(int id)
        {
            var project = _projectService.Get(id, UserId);

            if (project == null)
            {
                return NotFound();
            }

            return _mapper.Map<ProjectDTO>(project); ;
        }

        [HttpPut]
        public ActionResult<ProjectDTO> UpdateProject(ProjectDTO project)
        {
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
