using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.BusinessLogic.Activities;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private IActivityService _activityService;

        private const int USER_ID = 1;

        public ActivitiesController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [HttpPost]
        public Activity CreateActivity(Activity activity)
        {
            return _activityService.CreateActivity(activity, USER_ID);
        }

        [HttpDelete]
        public void DeleteActivity(int id)
        {
            _activityService.DeleteActivity(id, USER_ID);
        }

        [HttpGet]
        [ActionName("GetActivities")]
        public IEnumerable<Activity> GetActivities(DateTime dateTimeFrom,
            DateTime dateTimeTo)
        {
            var userId = int.Parse(User.FindFirst("sub")?.Value);

            return _activityService.GetActivities(dateTimeFrom, dateTimeTo, USER_ID);
        }

        [HttpGet]
        [ActionName("GetActivity")]
        [Route("{id}")]
        public ActionResult<Activity> GetActivity(int id)
        {
            var activity = _activityService.GetActivity(id, USER_ID);

            if (activity != null)
            {
                return activity;
            }

            return NotFound();
        }

        [HttpGet]
        [Route("running")]
        public IEnumerable<Activity> GetNotEndedActivities()
        {
            return _activityService.GetNotEndedActivities(USER_ID);
        }

        [HttpPut]
        public void UpdateActivity(Activity activity)
        {
            _activityService.UpdateActivity(activity, USER_ID);
        }
    }
}