using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.BusinessLogic.Users;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public const string secret = "SOME SECRET AFKAPFJPOAI SHFOPIASHFOPABGSFJ HASOFHASOIUJFGHASJIKFAJSHFOAHSFOUAHSFOIUHASUIOFHAIUOSFHGSIUOFG";

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // TODO: authorization
        //[HttpPost]
        //public User CreateActivity(User user)
        //{
        //    return _userService.CreateUser(user);
        //}

        //[HttpGet("{id}")]
        //public User GetUser(int id)
        //{
        //    return _userService.Get(USER_ID);
        //}

        //public User UpdateUser(User user)
        //{
        //    _userService.Update(user);
        //    return user;
        //}

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserCredentialsDTO userCredentials)
        {
            var user = _userService.Authenticate(userCredentials.Username, userCredentials.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("sub", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserCredentialsDTO userCredentials)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userCredentials);

            try
            {
                // save 
                _userService.Create(user, userCredentials.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}