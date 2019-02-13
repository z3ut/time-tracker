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

        public User CreateUser(User user)
        {
            var userDA = _mapper.Map<DataAccess.Models.User>(user);
            _activityContext.Users.Add(userDA);
            _activityContext.SaveChanges();
            var insertedUser = _mapper.Map<User>(userDA);
            return insertedUser;
        }

        public void DeleteUser(int id)
        {
            var user = new DataAccess.Models.User { Id = id };
            _activityContext.Users.Remove(user);
            _activityContext.SaveChanges();
        }

        public User GetUser(int id)
        {
            var user = _activityContext.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return null;
            }

            return _mapper.Map<User>(user);
        }

        public void UpdateUser(User user)
        {
            var userDA = _mapper.Map<DataAccess.Models.User>(user);
            _activityContext.Users.Update(userDA);
            _activityContext.SaveChanges();
        }
    }
}
