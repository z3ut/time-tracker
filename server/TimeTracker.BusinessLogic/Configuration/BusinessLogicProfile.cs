using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.BusinessLogic.Configuration
{
    public class BusinessLogicProfile : Profile
    {
        public BusinessLogicProfile()
        {
            CreateMap<Users.User, DataAccess.Models.User>().ReverseMap();
            CreateMap<Activities.Activity, DataAccess.Models.Activity>().ReverseMap();
        }
    }
}
