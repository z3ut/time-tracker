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
using TimeTracker.Web.Services;

namespace TimeTracker.Web.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IUserTokenService _userTokenService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService,
            IUserTokenService userTokenService, IMapper mapper)
        {
            _userService = userService;
            _userTokenService = userTokenService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("api/v{version:apiVersion}/users/authenticate")]
        public IActionResult Authenticate([FromBody] UserCredentialsDTO userCredentials)
        {
            var user = _userService.Authenticate(userCredentials.Username,
                userCredentials.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            var userDTO = _mapper.Map<UserDTO>(user);
            userDTO.Token = _userTokenService.CreateToken(user);
            return Ok(userDTO);
        }

        [AllowAnonymous]
        [HttpPost("api/v{version:apiVersion}/users/register")]
        public IActionResult Register([FromBody] UserCredentialsDTO userCredentials)
        {
            var user = _mapper.Map<User>(userCredentials);

            var createdUser = _userService.Create(user, userCredentials.Password);

            var userDTO = _mapper.Map<UserDTO>(createdUser);
            userDTO.Token = _userTokenService.CreateToken(createdUser);
            return Ok(userDTO);
        }

        [HttpPut("api/v{version:apiVersion}/users/{userId}")]
        public ActionResult<UserDTO> UpdateUser(int userId, [FromBody] UserDTO user)
        {
            if (userId != UserId || UserId != user.Id)
            {
                return BadRequest("Wrong user id");
            }

            var userBL = _mapper.Map<User>(user);
            var updatedUser = _userService.Update(userBL);
            var updatedUserDTO = _mapper.Map<UserDTO>(updatedUser);
            return updatedUserDTO;
        }

        [HttpGet("api/v{version:apiVersion}/workspaces/{workspaceId}/users")]
        public ActionResult<IEnumerable<UserInfoDTO>> GetWorkspaceUsers(int workspaceId)
        {
            var users = _userService.GetWorkspaceUsers(workspaceId, UserId);
            return _mapper.Map<IEnumerable<UserInfoDTO>>(users).ToList();
        }

        private int UserId
        {
            get { return int.Parse(User.FindFirst("sub")?.Value); }
        }
    }
}