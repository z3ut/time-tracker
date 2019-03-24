using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.DataAccess.Configuration
{
    public static class DataAccessServices
    {
        public static IServiceCollection ConfigureDataAccessServices(
            this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ActivityContext");
            services
                .AddDbContext<ActivityContext>(options =>
                    options.UseSqlServer(connectionString),
                    ServiceLifetime.Transient);

            return services;
        }
    }
}
