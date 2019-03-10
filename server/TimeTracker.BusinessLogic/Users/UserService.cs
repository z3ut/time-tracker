using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.BusinessLogic.Users.Passwords;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Users
{
    internal class UserService : IUserService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;
        private readonly IPasswordService _passwordService;

        public UserService(ActivityContext activityContext, IMapper mapper,
            IPasswordService passwordService)
        {
            _activityContext = activityContext;
            _mapper = mapper;
            _passwordService = passwordService;
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

        public void Update(User user, string password = null)
        {
            var userDA = _activityContext.Users.Find(user.Id);

            if (userDA == null)
            {
                throw new Exception("User not found");
            }

            if (user.Username != userDA.Username)
            {
                if (_activityContext.Users.Any(x => x.Username == user.Username))
                {
                    throw new Exception($"Username '${user.Username}' is already taken");
                }
            }

            userDA.Name = user.Name;

            if (!string.IsNullOrWhiteSpace(password))
            {
                _passwordService.CreatePasswordHash(password, out byte[] passwordHash,
                    out byte[] passwordSalt);

                userDA.PasswordHash = passwordHash;
                userDA.PasswordSalt = passwordSalt;
            }

            _activityContext.Users.Update(userDA);
            _activityContext.SaveChanges();
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
    }
}
