using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Activities
{
    public interface IActivityService
    {
        Activity Create(Activity activity, int userId);

        Activity Get(int id);
        Activity Get(int id, int userId);
        IEnumerable<Activity> Get(DateTime dateTimeFrom, DateTime dateTimeTo, int userId);
        IEnumerable<Activity> GetNotEnded(int userId);

        void Update(Activity activity, int userId);

        void Delete(int id, int userId);
    }
}
