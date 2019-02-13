using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTracker.BusinessLogic.Activities;
using TimeTracker.BusinessLogic.Users;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Configuration
{
    public class WebProfile : Profile
    {
        public WebProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, UserCredentialsDTO>().ReverseMap();
            CreateMap<Activity, ActivityDTO>().ReverseMap();
        }
    }
}
