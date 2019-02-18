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

        public ActivitiesController(IActivityService activityService)
        {
            _activityService = activityService;
        }

        [HttpPost]
        public Activity CreateActivity(Activity activity)
        {
            return _activityService.CreateActivity(activity, UserId);
        }

        [HttpDelete]
        public void DeleteActivity(int id)
        {
            _activityService.DeleteActivity(id, UserId);
        }

        [HttpGet]
        [ActionName("GetActivities")]
        public IEnumerable<Activity> GetActivities(DateTime dateTimeFrom,
            DateTime dateTimeTo)
        {
            return _activityService.GetActivities(dateTimeFrom, dateTimeTo, UserId);
        }

        [HttpGet]
        [ActionName("GetActivity")]
        [Route("{id}")]
        public ActionResult<Activity> GetActivity(int id)
        {
            var activity = _activityService.GetActivity(id, UserId);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        [HttpGet]
        [Route("running")]
        public IEnumerable<Activity> GetNotEndedActivities()
        {
            return _activityService.GetNotEndedActivities(UserId);
        }

        [HttpPut]
        public ActionResult<Activity> UpdateActivity(Activity activity)
        {
            _activityService.UpdateActivity(activity, UserId);
            return activity;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}