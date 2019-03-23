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
            CreateMap<Projects.Project, DataAccess.Models.Project>().ReverseMap();
            CreateMap<Workspaces.Workspace, DataAccess.Models.Workspace>().ReverseMap();
            CreateMap<Workspaces.UserWorkspace, DataAccess.Models.UserWorkspace>().ReverseMap();
            CreateMap<Workspaces.WorkspaceInvite, DataAccess.Models.WorkspaceInvite>().ReverseMap();
        }
    }
}
