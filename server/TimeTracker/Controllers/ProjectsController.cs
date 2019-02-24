using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.BusinessLogic.Projects;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public Project CreateActivity(Project project)
        {
            return _projectService.Create(project, UserId);
        }

        [HttpDelete]
        public void DeleteActivity(int id)
        {
            _projectService.Delete(id, UserId);
        }

        [HttpGet]
        [ActionName("GetProjects")]
        public IEnumerable<Project> GetActivities()
        {
            return _projectService.GetUserProjects(UserId);
        }

        [HttpGet]
        [ActionName("GetActivity")]
        [Route("{id}")]
        public ActionResult<Project> GetActivity(int id)
        {
            var activity = _projectService.Get(id, UserId);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        [HttpPut]
        public ActionResult<Project> UpdateProject(Project project)
        {
            _projectService.Update(project, UserId);
            return project;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}
