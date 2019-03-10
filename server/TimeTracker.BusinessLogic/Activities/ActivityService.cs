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

        public Activity Create(Activity activity, int userId)
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

        public void Delete(int id, int userId)
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

        public IEnumerable<Activity> Get(DateTime dateTimeFrom,
            DateTime dateTimeTo, int userId)
        {
            var activities = _activityContext.Activities
                .Where(a => a.UserId == userId &&
                    dateTimeFrom <= a.DateTimeStart &&
                    a.DateTimeStart < dateTimeTo);
            return _mapper.Map<List<Activity>>(activities);
        }

        public Activity Get(int id)
        {
            var activity = _activityContext.Activities
                .FirstOrDefault(a => a.Id == id);
            return _mapper.Map<Activity>(activity);
        }

        public Activity Get(int id, int userId)
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

            return _mapper.Map<Activity>(activity);
        }

        public void Update(Activity activity, int userId)
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

            savedActivity.DateTimeEnd = activity.DateTimeEnd;
            savedActivity.DateTimeStart = activity.DateTimeStart;
            savedActivity.Title = activity.Title;
            savedActivity.UserId = activity.UserId;
            savedActivity.ProjectId = activity.ProjectId;

            _activityContext.Activities.Update(savedActivity);
            _activityContext.SaveChanges();
        }
    }
}
