using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Activities
{
    public interface IActivityService
    {
        Activity CreateActivity(Activity activity, int userId);

        Activity GetActivity(int id);
        Activity GetActivity(int id, int userId);
        IEnumerable<Activity> GetActivities(DateTime dateTimeFrom, DateTime dateTimeTo, int userId);
        IEnumerable<Activity> GetNotEndedActivities(int userId);

        void UpdateActivity(Activity activity, int userId);

        void DeleteActivity(int id, int userId);
    }
}
