﻿using System;
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
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/activities")]
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

        [HttpDelete("{activityId}")]
        public ActionResult DeleteActivity(int activityId)
        {
            _activityService.Delete(activityId, UserId);
            return Ok();
        }

        [HttpGet("/api/v{version:apiVersion}/workspaces/{workspaceId}/activities")]
        public IEnumerable<ActivityDTO> GetWorkspaceActivities(
            int workspaceId, [FromQuery] DateTime dateTimeFrom,
            [FromQuery] DateTime dateTimeTo)
        {
            var activities = _activityService.GetAllUsersWorkspaceActivities(
                dateTimeFrom, dateTimeTo, UserId, workspaceId);
            return _mapper.Map<IEnumerable<ActivityDTO>>(activities);
        }

        [HttpGet]
        [Route("/api/v{version:apiVersion}/users/{userId}/workspaces/{workspaceId}/activities")]
        public ActionResult<IEnumerable<ActivityDTO>> GetUserWorkspaceActivities(
            int workspaceId, int userId, [FromQuery] DateTime dateTimeFrom,
            [FromQuery] DateTime dateTimeTo)
        {
            if (userId != UserId)
            {
                return BadRequest("Wrong user id");
            }

            var activities = _activityService.GetUserWorkspaceActivities(
                dateTimeFrom, dateTimeTo, UserId, workspaceId);
            return _mapper.Map<IEnumerable<ActivityDTO>>(activities).ToList();
        }

        [HttpGet("{activityId}")]
        public ActionResult<ActivityDTO> GetActivity(int activityId)
        {
            var activity = _activityService.Get(activityId, UserId);

            if (activity == null)
            {
                return NotFound();
            }

            return _mapper.Map<ActivityDTO>(activity);
        }

        [HttpPut("{activityId}")]
        public ActionResult<ActivityDTO> UpdateActivity(int activityId,
            ActivityDTO activity)
        {
            if (activityId != activity.Id)
            {
                return BadRequest("Wrong activity id");
            }

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