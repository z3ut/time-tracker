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
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.BusinessLogic.Users;
using TimeTracker.Web.Models;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly string secret;

        public UsersController(IUserService userService, IMapper mapper, IConfiguration config)
        {
            _userService = userService;
            _mapper = mapper;
            _config = config;
            secret = config["Secret"];
        }

        [AllowAnonymous]
        [Route("api/v1/users/authenticate")]
        [HttpPost]
        public IActionResult Authenticate([FromBody] UserCredentialsDTO userCredentials)
        {
            var user = _userService.Authenticate(userCredentials.Username, userCredentials.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var userDTO = _mapper.Map<UserDTO>(user);
            userDTO.Token = CreateToken(user);
            return Ok(userDTO);
        }

        [AllowAnonymous]
        [Route("api/v1/users/register")]
        [HttpPost]
        public IActionResult Register([FromBody] UserCredentialsDTO userCredentials)
        {
            var user = _mapper.Map<User>(userCredentials);

            var createdUser = _userService.Create(user, userCredentials.Password);
            var tokenString = CreateToken(createdUser);

            var userDTO = _mapper.Map<UserDTO>(createdUser);
            userDTO.Token = CreateToken(createdUser);
            return Ok(userDTO);
        }

        [HttpPut("api/v1/users/{userId}")]
        public ActionResult<UserDTO> UpdateUser(int userId, [FromBody] UserDTO user)
        {
            if (userId != UserId || UserId != user.Id)
            {
                return BadRequest("Wrong user id");
            }

            var userBL = _mapper.Map<User>(user);
            _userService.Update(userBL);

            return user;
        }

        [HttpGet("api/v1/workspaces/{workspaceId}/users")]
        public ActionResult<IEnumerable<UserInfoDTO>> GetWorkspaceUsers(int workspaceId)
        {
            var users = _userService.GetWorkspaceUsers(workspaceId, UserId);
            return _mapper.Map<IEnumerable<UserInfoDTO>>(users).ToList();
        }

        private string CreateToken(User user)
        {
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

            return tokenString;
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}