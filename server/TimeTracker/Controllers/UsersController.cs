using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.BusinessLogic.Users;

namespace TimeTracker.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        private const int USER_ID = 1;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        // TODO: authorization
        //[HttpPost]
        //public User CreateActivity(User user)
        //{
        //    return _userService.CreateUser(user);
        //}

        [HttpGet]
        public User GetUser()
        {
            return _userService.GetUser(USER_ID);
        }

        public User UpdateUser(User user)
        {
            _userService.UpdateUser(user);
            return user;
        }
    }
}