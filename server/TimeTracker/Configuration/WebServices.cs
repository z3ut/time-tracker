using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTracker.BusinessLogic.Configuration;

namespace TimeTracker.Web.Configuration
{
    public static class WebServices
    {
        public static IServiceCollection ConfigureWebServices(this IServiceCollection services)
        {
            services.ConfigureBusinessLogicServices();

            var automapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<WebProfile>();
                cfg.AddProfile<BusinessLogicProfile>();
            });

            services.AddScoped<IMapper>(cfg => automapperConfig.CreateMapper());

            return services;
        }
    }
}
