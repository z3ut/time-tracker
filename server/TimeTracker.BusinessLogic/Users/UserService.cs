using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using TimeTracker.BusinessLogic.Users.Passwords;
using TimeTracker.BusinessLogic.Workspaces;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Users
{
    internal class UserService : IUserService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;
        private readonly IPasswordService _passwordService;
        private readonly IUserWorkspaceService _userWorkspaceService;

        public UserService(ActivityContext activityContext, IMapper mapper,
            IPasswordService passwordService, IUserWorkspaceService userWorkspaceService)
        {
            _activityContext = activityContext;
            _mapper = mapper;
            _passwordService = passwordService;
            _userWorkspaceService = userWorkspaceService;
        }

        public User Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new Exception("Password is required");
            }
                
            if (_activityContext.Users.Any(x => x.Username == user.Username))
            {
                throw new Exception($"Username '${user.Username}' is already taken");
            }

            _passwordService.CreatePasswordHash(password, out byte[] passwordHash,
                out byte[] passwordSalt);

            var userDA = _mapper.Map<DataAccess.Models.User>(user);
            userDA.PasswordHash = passwordHash;
            userDA.PasswordSalt = passwordSalt;
            _activityContext.Users.Add(userDA);

            var defaultWorkspace = new DataAccess.Models.Workspace();
            defaultWorkspace.Name = $"{user.Username} default workspace";
            defaultWorkspace.DateTimeCreated = DateTime.Now;
            defaultWorkspace.User = userDA;
            _activityContext.Workspaces.Add(defaultWorkspace);

            var userSelectedWorkspace = new DataAccess.Models.UserSelectedWorkspace();
            userSelectedWorkspace.User = userDA;
            userSelectedWorkspace.Workspace = defaultWorkspace;
            _activityContext.UserSelectedWorkspaces.Add(userSelectedWorkspace);

            _activityContext.SaveChanges();

            var insertedUser = _mapper.Map<User>(userDA);
            return insertedUser;
        }

        public void Delete(int id)
        {
            var user = new DataAccess.Models.User { Id = id };
            _activityContext.Users.Remove(user);
            _activityContext.SaveChanges();
        }

        public User Get(int id)
        {
            var user = _activityContext.Users.Find(id);

            if (user == null)
            {
                return null;
            }

            return _mapper.Map<User>(user);
        }

        public User Update(User user, string password = null)
        {
            var savedUser = _activityContext.Users.Find(user.Id);

            if (savedUser == null)
            {
                throw new Exception("User not found");
            }

            if (user.Username != savedUser.Username)
            {
                if (_activityContext.Users.Any(x => x.Username == user.Username))
                {
                    throw new Exception($"Username '${user.Username}' is already taken");
                }
            }

            savedUser.Name = user.Name;

            if (!string.IsNullOrWhiteSpace(password))
            {
                _passwordService.CreatePasswordHash(password, out byte[] passwordHash,
                    out byte[] passwordSalt);

                savedUser.PasswordHash = passwordHash;
                savedUser.PasswordSalt = passwordSalt;
            }

            _activityContext.SaveChanges();

            var updatedUser = _mapper.Map<User>(savedUser);
            return updatedUser;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var user = _activityContext.Users
                .FirstOrDefault(u => u.Username == username);

            if (user == null)
            {
                return null;
            }

            if (!_passwordService.IsPasswordHashValid(password,
                user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return _mapper.Map<User>(user);
        }

        public IEnumerable<User> GetWorkspaceUsers(int workspaceId, int userId)
        {
            if (!_userWorkspaceService.IsWorkspaceInUserWorkspaces(workspaceId, userId))
            {
                throw new Exception("Workspace doesn't belong to user");
            }

            var usersInWorkspace = _activityContext.UserWorkspaces
                .Where(uw => uw.WorkspaceId == workspaceId)
                .Select(uw => uw.User)
                .ToList();

            var workspace = _activityContext.Workspaces
                .FirstOrDefault(w => w.UserId == userId);

            if (workspace != null && workspace.User != null)
            {
                usersInWorkspace.Add(workspace.User);
            }
            
            return _mapper.Map<IEnumerable<User>>(usersInWorkspace);
        }
    }
}
