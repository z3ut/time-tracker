using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TimeTracker.DataAccess;

namespace TimeTracker.BusinessLogic.Users
{
    internal class UserService : IUserService
    {
        private readonly ActivityContext _activityContext;
        private readonly IMapper _mapper;

        public UserService(ActivityContext activityContext, IMapper mapper)
        {
            _activityContext = activityContext;
            _mapper = mapper;
        }

        public User Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (_activityContext.Users.Any(x => x.Username == user.Username))
                throw new Exception("Username \"" + user.Username + "\" is already taken");

            CreatePasswordHash(password, out byte[] passwordHash,
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
                // username has changed so check if the new username is already taken
                if (_activityContext.Users.Any(x => x.Username == user.Username))
                    throw new Exception("Username " + user.Username + " is already taken");
            }

            userDA.Name = user.Name;

            if (!string.IsNullOrWhiteSpace(password))
            {
                CreatePasswordHash(password, out byte[] passwordHash,
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

            if (!IsPasswordHashValid(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return _mapper.Map<User>(user);
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool IsPasswordHashValid(string password, byte[] hash, byte[] salt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (hash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (salt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != hash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
