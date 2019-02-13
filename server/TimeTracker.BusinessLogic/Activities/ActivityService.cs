using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Activities
{
    public class ActivityService : IActivityService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;

        public ActivityService(ActivityContext activityContext, IMapper mapper)
        {
            _activityContext = activityContext;
            _mapper = mapper;
        }

        public Activity CreateActivity(Activity activity, int userId)
        {
            if (activity.UserId != userId)
            {
                throw new Exception("Activity doesn't belong to user");
            }

            var activityDA = _mapper.Map<DataAccess.Models.Activity>(activity);
            _activityContext.Activities.Add(activityDA);
            _activityContext.SaveChanges();

            var insertedActivity = _mapper.Map<Activity>(activityDA);
            return insertedActivity;
        }

        public void DeleteActivity(int id, int userId)
        {
            var activity = _activityContext.Activities
                .FirstOrDefault(a => a.Id == id);

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

        public IEnumerable<Activity> GetActivities(DateTime dateTimeFrom,
            DateTime dateTimeTo, int userId)
        {
            var activities = _activityContext.Activities
                .Where(a => a.UserId == userId &&
                    dateTimeFrom <= a.DateTimeStart &&
                    a.DateTimeStart < dateTimeTo);
            return _mapper.Map<List<Activity>>(activities);
        }

        public Activity GetActivity(int id)
        {
            var activity = _activityContext.Activities
                .FirstOrDefault(a => a.Id == id);
            return _mapper.Map<Activity>(activity);
        }

        public Activity GetActivity(int id, int userId)
        {
            var activity = _activityContext.Activities
                .FirstOrDefault(a => a.Id == id);

            if (activity.UserId != userId)
            {
                return null;
            }

            return _mapper.Map<Activity>(activity);
        }

        public IEnumerable<Activity> GetNotEndedActivities(int userId)
        {
            var activities = _activityContext.Activities
                .Where(a => a.UserId == userId &&
                    a.DateTimeEnd == null);
            return _mapper.Map<List<Activity>>(activities);
        }

        public void UpdateActivity(Activity activity, int userId)
        {
            if (activity.UserId != userId)
            {
                throw new Exception("Activity doesn't belong to user");
            }

            var activityDA = _mapper.Map<DataAccess.Models.Activity>(activity);
            _activityContext.Activities.Update(activityDA);
            _activityContext.SaveChanges();
        }
    }
}
