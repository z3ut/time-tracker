using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Users
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User Create(User user, string password);
        User Get(int userId);
        User Update(User user, string password = null);
        void Delete(int userId);
        IEnumerable<User> GetWorkspaceUsers(int workspaceId, int userId);
    }
}
