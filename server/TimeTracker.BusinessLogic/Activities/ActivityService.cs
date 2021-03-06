﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.BusinessLogic.Workspaces;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Activities
{
    public class ActivityService : IActivityService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;
        private readonly IUserWorkspaceService _userWorkspaceService;

        public ActivityService(ActivityContext activityContext, IMapper mapper,
            IUserWorkspaceService userWorkspaceService)
        {
            _activityContext = activityContext;
            _mapper = mapper;
            _userWorkspaceService = userWorkspaceService;
        }

        public Activity Create(Activity activity, int userId)
        {
            if (activity.UserId != userId)
            {
                throw new Exception("Activity doesn't belong to user");
            }

            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                activity.WorkspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var activityDA = _mapper.Map<DataAccess.Models.Activity>(activity);
            _activityContext.Activities.Add(activityDA);
            _activityContext.SaveChanges();

            var insertedActivity = _mapper.Map<Activity>(activityDA);
            return insertedActivity;
        }

        public void Delete(int activityId, int userId)
        {
            var activity = _activityContext.Activities
                .FirstOrDefault(a => a.Id == activityId);

            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            if (activity.UserId != userId)
            {
                throw new Exception("Activity doesn't belong to user");
            }

            _activityContext.Activities.Remove(activity);
            _activityContext.SaveChanges();
        }

        public IEnumerable<Activity> GetAllUsersWorkspaceActivities(
            DateTime dateTimeFrom, DateTime dateTimeTo,
            int userId, int workspaceId)
        {
            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                workspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var activities = _activityContext.Activities
                .Where(a => a.WorkspaceId == workspaceId &&
                    dateTimeFrom <= a.DateTimeStart &&
                    a.DateTimeStart < dateTimeTo);
            return _mapper.Map<List<Activity>>(activities);
        }

        public IEnumerable<Activity> GetUserWorkspaceActivities(DateTime dateTimeFrom,
            DateTime dateTimeTo, int userId, int workspaceId)
        {
            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                workspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var activities = _activityContext.Activities
                .Where(a => a.WorkspaceId == workspaceId &&
                    a.UserId == userId &&
                    dateTimeFrom <= a.DateTimeStart &&
                    a.DateTimeStart < dateTimeTo);
            return _mapper.Map<List<Activity>>(activities);
        }

        public Activity Get(int id, int userId)
        {
            var activity = _activityContext.Activities
                .FirstOrDefault(a => a.Id == id);

            if (activity == null)
            {
                return null;
            }

            if (!_userWorkspaceService.IsActivityInUserWorkspaces(activity.Id, userId))
            {
                throw new Exception("Activity doesn't belong to user workspaces");
            }

            return _mapper.Map<Activity>(activity);
        }

        public Activity Update(Activity activity, int userId)
        {
            var savedActivity = _activityContext.Activities.Find(activity.Id);

            if (savedActivity == null)
            {
                throw new Exception("Activity not found");
            }

            if (savedActivity.UserId != userId)
            {
                throw new Exception("Activity doesn't belong to user");
            }

            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(
                activity.WorkspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var newActivity = _mapper.Map<DataAccess.Models.Activity>(activity);
            _activityContext.Entry(savedActivity).CurrentValues.SetValues(newActivity);

            _activityContext.SaveChanges();

            _activityContext.Entry(savedActivity).Reload();

            var updatedActivity = _mapper.Map<Activity>(savedActivity);
            return updatedActivity;
        }
    }
}
