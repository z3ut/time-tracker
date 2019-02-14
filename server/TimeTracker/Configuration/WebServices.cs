using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.BusinessLogic.Configuration;
using TimeTracker.BusinessLogic.Users;
using TimeTracker.Web.Controllers;

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

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();

                        var identity = context.Principal.Identity as ClaimsIdentity;
                        var sub = identity.FindFirst("sub").Value;
                        var userId = int.Parse(sub);

                        var user = userService.Get(userId);
                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(UsersController.secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            return services;
        }
    }
}
