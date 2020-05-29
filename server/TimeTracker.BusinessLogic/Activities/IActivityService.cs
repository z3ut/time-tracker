using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Activities
{
    public interface IActivityService
    {
        Activity Create(Activity activity, int userId);
        Activity Get(int activityId, int userId);
        IEnumerable<Activity> GetAllUsersWorkspaceActivities(DateTime dateTimeFrom, DateTime dateTimeTo, int userId, int workspaceId);
        IEnumerable<Activity> GetUserWorkspaceActivities(DateTime dateTimeFrom, DateTime dateTimeTo, int userId, int workspaceId);
        Activity Update(Activity activity, int userId);
        void Delete(int activityId, int userId);
    }
}
