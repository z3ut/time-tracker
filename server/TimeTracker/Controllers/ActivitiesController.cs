using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.BusinessLogic.Activities;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityService _activityService;
        private readonly IMapper _mapper;

        public ActivitiesController(IActivityService activityService,
            IMapper mapper)
        {
            _activityService = activityService;
            _mapper = mapper;
        }

        [HttpPost]
        public ActivityDTO CreateActivity(ActivityDTO activity)
        {
            var activityBL = _mapper.Map<Activity>(activity);
            var createdActivity = _activityService.Create(activityBL, UserId);
            return _mapper.Map<ActivityDTO>(createdActivity);
        }

        [HttpDelete]
        public void DeleteActivity(int id)
        {
            _activityService.Delete(id, UserId);
        }

        [HttpGet]
        [ActionName("GetActivities")]
        public IEnumerable<ActivityDTO> GetActivities(DateTime dateTimeFrom,
            DateTime dateTimeTo)
        {
            var activities = _activityService.Get(dateTimeFrom, dateTimeTo, UserId);
            return _mapper.Map<IEnumerable<ActivityDTO>>(activities);
        }

        [HttpGet]
        [ActionName("GetActivity")]
        [Route("{id}")]
        public ActionResult<ActivityDTO> GetActivity(int id)
        {
            var activity = _activityService.Get(id, UserId);

            if (activity == null)
            {
                return NotFound();
            }

            return _mapper.Map<ActivityDTO>(activity);
        }

        [HttpPut]
        public ActionResult<ActivityDTO> UpdateActivity(ActivityDTO activity)
        {
            var activityBL = _mapper.Map<Activity>(activity);
            _activityService.Update(activityBL, UserId);
            return activity;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}