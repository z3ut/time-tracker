using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Users
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User Create(User user, string password);
        User Get(int id);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}
