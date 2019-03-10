using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using TimeTracker.BusinessLogic.Activities;
using TimeTracker.BusinessLogic.Projects;
using TimeTracker.BusinessLogic.Users;
using TimeTracker.BusinessLogic.Users.Passwords;
using TimeTracker.DataAccess.Configuration;

namespace TimeTracker.BusinessLogic.Configuration
{
    public static class BusinessLogicServices
    {
        public static IServiceCollection ConfigureBusinessLogicServices(this IServiceCollection services)
        {
            services.ConfigureDataAccessServices();

            services.AddScoped<IActivityService, ActivityService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IPasswordService, PasswordService>();

            return services;
        }
    }
}
