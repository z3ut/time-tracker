using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using TimeTracker.BusinessLogic.Activities;
using TimeTracker.BusinessLogic.Users;
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

            return services;
        }
    }
}
