using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTracker.DataAccess.Configuration
{
    public static class DataAccessServices
    {
        public static IServiceCollection ConfigureDataAccessServices(this IServiceCollection services)
        {
            var connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Database=Activities;Trusted_Connection=True;ConnectRetryCount=0";
            services
                .AddDbContext<ActivityContext>(options =>
                    options.UseSqlServer(connectionString));

            return services;
        }
    }
}
