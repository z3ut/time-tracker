using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTracker.BusinessLogic.Users;

namespace TimeTracker.Web.Services
{
    public interface IUserTokenService
    {
        string CreateToken(User user);
    }
}
