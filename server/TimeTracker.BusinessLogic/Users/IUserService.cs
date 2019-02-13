using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Users
{
    public interface IUserService
    {
        User CreateUser(User user);

        User GetUser(int id);

        void UpdateUser(User user);

        void DeleteUser(int id);
    }
}
