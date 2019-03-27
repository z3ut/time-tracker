using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TimeTracker.BusinessLogic.Users;

namespace TimeTracker.Web.Services
{
    public class UserTokenService : IUserTokenService
    {
        private readonly string _secret;
        private readonly int _tokenExpireDays;

        public UserTokenService(string secret, int tokenExpireDays)
        {
            _secret = secret;
            _tokenExpireDays = tokenExpireDays;
        }

        public string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("sub", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(_tokenExpireDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
